import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TableVirtuoso } from 'react-virtuoso';
import { checkAuthenticatedAdmin } from '../../../utils/client-functions';
import axios from "axios"

const isAdminAuth = sessionStorage?.getItem("afd8TvhsdjwiuuvsgjhsAfgsUhjs")



const columns = [
  {
    width: 200,
    label: 'Coupon Code',
    dataKey: 'code',
  },
  {
    width: 120,
    label: 'Product Name',
    dataKey: 'productName'
  },
  {
    width: 120,
    label: 'Discount (%)',
    dataKey: 'discountPercentage',
    numeric: true,
  },
  {
    width: 120,
    label: 'Alotted Count',
    dataKey: 'allotedUseCount',
    numeric: true,
  },
  {
    width: 120,
    label: 'Usage Count',
    dataKey: 'currentUseCount',
    numeric: true,
  },
  {
    width: 120,
    label: 'Created At',
    dataKey: 'createdAt'
  },
  {
    width: 120,
    label: 'Expire At',
    dataKey: 'expiration'
  },
  {
    width: 120,
    label: 'Action',
    dataKey: 'action'
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

const rowContent = (_index, row) => {
  const handleCouponDelete = async () => {
      try {
          //must await
          await checkAuthenticatedAdmin()
      } catch (error) {
          return window.location.href = "/";      
      }
      try {
          const couponCode = {
              code: row.code
          }
          const response = await axios.post("/origin/delete-coupon", couponCode, {
              headers: {
                "x-access-token": isAdminAuth,
              },
          });

          if(response.status !== 200) {
              alert("Coupon not deleted")
              return
          }
          alert(`${row.code} deleted`)
          window.location.reload()
      } catch (error) {
          alert(error.response.data)
      }
  }
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === "action" ?   (
            <div 
                onClick={handleCouponDelete} 
                style={{ color: 'rgba(158, 9, 9, 0.733)', width: "100%", display: "flex", justifyContent: "center" }} 
            > 
                <div style={{cursor: "pointer"}}>
                    <DeleteForeverIcon fontSize='small' /> 
                </div>
            </div>) : row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function CouponTable(props) {
  return (
    <Paper style={{ height: 350, width: '100%' }}>
      <TableVirtuoso
        data={props.allCoupons}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
