import React, { useState, useEffect, useRef } from "react";
import chatBoxCss from "./ChatBoxes.module.css";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Person4Icon from '@mui/icons-material/Person4';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector, useDispatch } from "react-redux";
import { setError, setSuccessMini } from "../../../redux/states";
import { errorAnimation, successMiniAnimation } from "../../../utils/client-functions";

// Simple component for the scroll-to-bottom button
export const ScrollToBottom = ({ onClick, visible }) => {
  return (
    <div 
      className={`${chatBoxCss.scrollToBottom} ${visible ? chatBoxCss.scrollToBottomVisible : ''}`}
      onClick={onClick}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 13L12 18L17 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 6L12 11L17 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

// User message component
export const User = (props) => {
  const { error, successMini } = useSelector((state) => state.stateData);
  const dispatch = useDispatch();
  
  const errorSetter = (string) => {
    dispatch(setError(string));
    errorAnimation();
  };

  const successSetter = (string) => {
    dispatch(setSuccessMini(string));
    successMiniAnimation();
  };

  const handleCopy = () => {
    const textToCopy = typeof props.children === 'string' 
      ? props.children 
      : React.Children.map(props.children, child => 
          typeof child === "string" ? child : 
          React.isValidElement(child) ? child.props.children : ""
        ).join('');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          successSetter('Text copied to clipboard');
        })
        .catch(err => {
          errorSetter('Failed to copy text: ' + err.message);
        });
    } else {
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = textToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      successSetter('Text copied to clipboard');
    }
  };

  // Format user content to preserve paragraphs
  const formattedContent = typeof props.children === 'string'
    ? props.children.split('\n').map((paragraph, index) => (
        paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
      ))
    : props.children;

  return (
    <div className={chatBoxCss.userOutter}>
      <div className={chatBoxCss.User}>
        <div className="error">{error}</div>
        <div className="success-mini">{successMini}</div>
        <div className={chatBoxCss.userContent}>
          {formattedContent}
        </div>
        <span className={chatBoxCss.UserCopyIcon} onClick={handleCopy}>
          <ContentCopyIcon fontSize="small" />
        </span>
      </div>
      <Person4Icon sx={{color: "#3E8F93"}}/>
    </div>
  );
};

// Assistant message component
export const Assistant = (props) => {
  const { error, successMini, messages } = useSelector((state) => state.stateData);
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const typingTimerRef = useRef(null);
  const messageRef = useRef(null);
  const messageContentRef = useRef(''); // Store message content for comparison
  const initialRenderRef = useRef(true); // Track initial render
  const messagesRef = useRef([]); // Store previous messages array for comparison
  const sessionSwitchRef = useRef(false); // Track session switches
  
  const errorSetter = (string) => {
    dispatch(setError(string));
    errorAnimation();
  };

  const successSetter = (string) => {
    dispatch(setSuccessMini(string));
    successMiniAnimation();
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    const chatContainer = document.querySelector('.chat-ex');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  // Extract the raw text content from props.children
  const getRawContent = () => {
    if (props.contentTrim) return '';
    
    if (typeof props.children === 'string') {
      return props.children;
    } else if (Array.isArray(props.children)) {
      return React.Children.map(props.children, child => 
        typeof child === 'string' ? child : 
        React.isValidElement(child) && child.props.children ? 
          (typeof child.props.children === 'string' ? 
            child.props.children : '') : ''
      ).join('');
    } else if (React.isValidElement(props.children) && props.children.props.children) {
      return typeof props.children.props.children === 'string' ? 
        props.children.props.children : '';
    }
    return '';
  };

  // Check if this is the latest assistant message
  const isLatestAssistantMessage = () => {
    if (!messages || messages.length === 0) return false;
    
    // Get the last message in the array
    const lastMessage = messages[messages.length - 1];
    
    // If the last message is from the assistant, check if it matches this component
    if (lastMessage.role === 'assistant') {
      const content = getRawContent();
      return lastMessage.content === content;
    }
    
    return false;
  };

  // Track message array changes
  useEffect(() => {
    // Update the reference when messages array changes
    if (messages !== messagesRef.current) {
      messagesRef.current = messages;
    }
  }, [messages]);

  // Format code blocks in the message
  const formatCodeBlocks = (text) => {
    if (!text) return [];
    
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }
      
      // Extract code and language if specified
      const codeContent = match[1];
      let language = '';
      let code = codeContent;
      
      // Check if the first line specifies a language
      const firstLineMatch = codeContent.match(/^(\w+)\s*\n([\s\S]*)$/);
      if (firstLineMatch) {
        language = firstLineMatch[1];
        code = firstLineMatch[2];
      }
      
      // Preserve indentation by not trimming
      parts.push({
        type: 'code',
        language,
        content: code
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }
    
    return parts;
  };

  // Handle copying code blocks
  const handleCodeCopy = (codeText) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText)
        .then(() => {
          successSetter('Code copied to clipboard');
        })
        .catch(err => {
          errorSetter('Failed to copy code: ' + err.message);
        });
    } else {
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = codeText;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      successSetter('Code copied to clipboard');
    }
  };

  // Handle copying the entire message
  const handleCopy = () => {
    const textToCopy = getRawContent();
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          successSetter('Text copied to clipboard');
        })
        .catch(err => {
          errorSetter('Failed to copy text: ' + err.message);
        });
    } else {
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = textToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      successSetter('Text copied to clipboard');
    }
  };

  // Format text with markdown-like syntax (bold, italic, links)
  const formatText = (text) => {
    if (!text) return text;
    
    // Split text by double newlines to identify paragraphs
    const paragraphs = text.split(/\n\s*\n/);
    
    return paragraphs.map((paragraph, pIndex) => {
      // Split paragraph by single newlines to handle line breaks within paragraphs
      const lines = paragraph.split(/\n/);
      
      return (
        <div key={`p-${pIndex}`} className={chatBoxCss.paragraph}>
          {lines.map((line, lIndex) => {
            if (!line.trim()) {
              return <br key={`br-${pIndex}-${lIndex}`} />;
            }
            
            // Preserve indentation
            const indentMatch = line.match(/^(\s+)/);
            const indent = indentMatch ? indentMatch[0].length : 0;
            const indentStyle = indent > 0 ? { paddingLeft: `${indent * 0.5}em` } : {};
            
            // Format bold text
            let formattedLine = line.replace(
              /\*\*(.*?)\*\*|__(.*?)__/g, 
              (match, p1, p2) => `<strong>${p1 || p2}</strong>`
            );
            
            // Format italic text
            formattedLine = formattedLine.replace(
              /\*(.*?)\*|_(.*?)_/g,
              (match, p1, p2) => `<em>${p1 || p2}</em>`
            );
            
            // Format links
            formattedLine = formattedLine.replace(
              /(https?:\/\/[^\s]+)/g,
              '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
            );
            
            return (
              <div 
                key={`line-${pIndex}-${lIndex}`}
                style={indentStyle}
                className={chatBoxCss.textLine}
                dangerouslySetInnerHTML={{ __html: formattedLine }}
              />
            );
          })}
        </div>
      );
    });
  };

  // Start typing animation
  const startTypingAnimation = (text) => {
    setIsTyping(true);
    setTypingComplete(false);
    setDisplayedText('');
    
    let i = 0;
    const textLength = text.length;
    // Slower typing speed (higher values = slower typing)
    const typingSpeed = Math.max(20, Math.min(40, 1200 / textLength));
    
    // Clear any existing timer
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }
    
    // Use a faster initial typing speed for the first few characters
    // to make the animation feel more responsive
    const initialChunkSize = Math.min(20, Math.floor(textLength * 0.05));
    if (initialChunkSize > 0) {
      setDisplayedText(text.substring(0, initialChunkSize));
      i = initialChunkSize;
      scrollToBottom();
    }
    
    typingTimerRef.current = setInterval(() => {
      if (i < textLength) {
        // Add fewer characters at once for slower typing
        const chunkSize = Math.max(1, Math.floor(textLength / 400));
        const nextChunk = text.substring(i, Math.min(i + chunkSize, textLength));
        setDisplayedText(prev => prev + nextChunk);
        i += nextChunk.length;
        
        // Scroll to bottom on each update to follow the typing
        scrollToBottom();
        
        // Scroll more frequently when new lines are added
        if (nextChunk.includes('\n')) {
          setTimeout(scrollToBottom, 50);
        }
      } else {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        setIsTyping(false);
        setTypingComplete(true);
        scrollToBottom();
      }
    }, typingSpeed);
  };

  // Effect to handle typing animation
  useEffect(() => {
    // Skip animation for empty content or loading indicator
    if (props.contentTrim || !props.children) {
      setIsTyping(false);
      setDisplayedText('');
      return;
    }
    
    const content = getRawContent();
    
    // Check if this is the latest assistant message
    const isLatest = isLatestAssistantMessage();
    
    // Check if content has changed (new message)
    const isNewContent = content !== messageContentRef.current;
    
    // Update the reference
    const prevContent = messageContentRef.current;
    messageContentRef.current = content;
    
    // On initial render, just display the content without animation
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      setIsTyping(false);
      setDisplayedText(content);
      setTypingComplete(true);
    }
    // Animate only if this is the latest message and it's new content (not empty)
    // This ensures animation only happens for new responses to user queries
    else if (isLatest && isNewContent && content.trim() !== '' && prevContent !== content) {
      startTypingAnimation(content);
    } else {
      setIsTyping(false);
      setDisplayedText(content);
    }
    
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [props.children, props.contentTrim, messages]);

  // Scroll to bottom when component mounts
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Render the message content
  const renderContent = () => {
    if (props.contentTrim) return props.children;
    
    if (isTyping) {
      // During typing animation, just format the partial text
      return formatText(displayedText);
    } else {
      // After typing is complete, format with code blocks
      const content = getRawContent();
      const parts = formatCodeBlocks(content);
      
      return parts.map((part, index) => {
        if (part.type === 'text') {
          return (
            <div key={`text-${index}`} className={chatBoxCss.textContent}>
              {formatText(part.content)}
            </div>
          );
        } else if (part.type === 'code') {
          return (
            <div key={`code-${index}`} className={chatBoxCss.codeBlock}>
              {part.language && (
                <div className={chatBoxCss.codeLanguage}>{part.language}</div>
              )}
              <pre className={chatBoxCss.codeContent}>
                {part.content}
              </pre>
              <span 
                className={chatBoxCss.codeCopyIcon} 
                onClick={() => handleCodeCopy(part.content)}
              >
                <ContentCopyIcon fontSize="small" />
              </span>
            </div>
          );
        }
        return null;
      });
    }
  };

  return (
    <div className={chatBoxCss.assistantOuter}>
      <SmartToyIcon sx={{color: "beige"}} />
      <div className={chatBoxCss.Assistant} ref={messageRef}>
        <div className="error">{error}</div>
        <div className="success-mini">{successMini}</div>
        
        <div className={chatBoxCss.assistantContent}>
          {renderContent()}
        </div>

        <span className={chatBoxCss.AssistantCopyIcon} onClick={handleCopy}>
          {props.contentTrim ? "" : <ContentCopyIcon fontSize="small" />}
        </span>
      </div>
    </div>
  );
};
