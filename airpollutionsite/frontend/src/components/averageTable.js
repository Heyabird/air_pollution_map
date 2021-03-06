import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs};
}

// filling in the table
const averageTable = props => {
  const classes = useStyles();
  const averagePM = props.cityData.tableData;
  const rows = [
    createData(averagePM[0][0], averagePM[0][1], averagePM[0][2], averagePM[0][3]),
    createData(averagePM[1][0], averagePM[1][1], averagePM[1][2], averagePM[1][3]),
    createData(averagePM[2][0], averagePM[2][1], averagePM[2][2], averagePM[2][3]),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

console.log("cityData", props.cityData);
console.log("cityData.tableData", props.cityData.tableData);
console.log("cityData.tableData[0]", props.cityData.tableData[0]);


  return (
    <>
      <div id="table-container" style={{display:"inline-block", float:"right"}}
      >
        {/* need to swtich out of Material UI -- their tables are extremely tricky to custom style.. */}
        <TableContainer width={1/4}
        >
          <Table className={classes.table} size="small" aria-label="a simple table">
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell color="primary" align="left">2018</TableCell>
                <TableCell align="left">2019</TableCell>
                <TableCell align="left">2020</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.calories}</TableCell>
                  <TableCell align="left">{row.fat}</TableCell>
                  <TableCell align="left">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <h4>Average PM2.5 levels
      </h4>
      </div>
    </>
  );

}

export default averageTable