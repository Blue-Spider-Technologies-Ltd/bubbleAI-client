import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';



const columns = [
  {
    width: 200,
    label: 'First Name',
    dataKey: 'firstName'
  },  
  {
    width: 200,
    label: 'Last Name',
    dataKey: 'lastName'
  },
  {
    width: 250,
    label: 'Email',
    dataKey: 'email',
  },  
  {
    width: 50,
    label: 'DOB',
    dataKey: 'dob',
  },
  {
    width: 120,
    label: 'Mobile',
    dataKey: 'mobile'
  },
  {
    width: 100,
    label: 'Street',
    dataKey: 'streetCity'
  },
  {
    width: 70,
    label: 'State',
    dataKey: 'stateRegion'
  },
  {
    width: 120,
    label: 'Country',
    dataKey: 'country'
  },
  {
    width: 70,
    label: 'Verified',
    dataKey: 'verified',
  },
  {
    width: 70,
    label: 'Rated Bubble',
    dataKey: 'rated'
  },
  {
    width: 150,
    label: 'Joined',
    dataKey: 'createdAt',
  },
];


const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: '#c0d1d457',
            fontWeight: 600
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
}

export default function UsersTable(props) {
  return (
    <Paper style={{ height: "80vh", width: '100%' }}>
      <TableVirtuoso
        data={props.allUsers}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
