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
    label: 'Ref',
    dataKey: 'tx_ref'
  },  
  {
    width: 200,
    label: 'ID',
    dataKey: 'transaction_id'
  },
  {
    width: 100,
    label: 'Currency',
    dataKey: 'currency',
  },  
  {
    width: 120,
    label: 'Status',
    dataKey: 'status',
  },
  {
    width: 150,
    label: 'Amount Settled',
    dataKey: 'amount_settled'
  },
  {
    width: 100,
    label: 'App Fee',
    dataKey: 'app_fee'
  },
  {
    width: 100,
    label: 'Payment Type',
    dataKey: 'payment_type'
  },
  {
    width: 100,
    label: 'Duration',
    dataKey: 'duration'
  },
  {
    width: 150,
    label: 'Product',
    dataKey: 'product',
  },
  {
    width: 200,
    label: 'Coupon Code',
    dataKey: 'couponCode'
  },
  {
    width: 150,
    label: 'IP',
    dataKey: 'ip'
  },
  {
    width: 150,
    label: 'Time',
    dataKey: 'createdAt',
  }
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

export default function TransactionsTable(props) {
  return (
    <Paper style={{ height: "80vh", width: '100%' }}>
      <TableVirtuoso
        data={props.allTransactions}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
