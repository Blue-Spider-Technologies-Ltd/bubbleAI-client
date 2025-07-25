import {CardContainerStyled, ContainerStyled} from "../../../styled/Subscriptions";
import {SectionTitleStyled} from "../../../styled/HomeContent";
import {useTheme} from "../Theme/ThemeContext"
import Card from "./Card";

const SubscriptionPlans = () => {
    const {themeName} = useTheme();
    return (
        <ContainerStyled theme={themeName} >
            <SectionTitleStyled theme={themeName}>
                Bubble Plans
            </SectionTitleStyled>

            <CardContainerStyled>
                <Card />
            </CardContainerStyled>


        </ContainerStyled>
    )
}

export default SubscriptionPlans;