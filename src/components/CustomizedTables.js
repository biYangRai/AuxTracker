//Used material-ui to create table element

import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//css styling the tablehead component from material-ui :https://material-ui.com/components/tables/  https://material-ui.com/api/table/
const StyledTableHead = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .5)",
  },
})(TableHead);

//css styling the table cell component from material-ui
const StyledTableCell = withStyles((theme) => ({
  root: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  body: {
    fontSize: 13,
    background: "#dbd3d3",
  },
  stickyHeader: {
    fontSize: "1rem",
    background: "#9b9494",
  },
}))(TableCell);

//css styling the table row component from material-ui
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

//rendering the table
//rows is a prop passed from Parent component(App). It directly refers to JSON data
//HTML tags for table like 'table', 'thead','tbody','tr','td','th' are replaced by the CSS styled constan
const CustomizedTables = ({ rows }) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table stickyHeader aria-label="customized table">
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Aux</StyledTableCell>
            <StyledTableCell align="right">Duration</StyledTableCell>
            <StyledTableCell align="right">TimeStamp</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {/*if rows is empty then return nothing*/}
          {rows
            ? rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.Aux}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Duration}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.TimeStamp}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTables;
