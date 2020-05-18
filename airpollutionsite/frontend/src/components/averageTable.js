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




const averageTable = props => {
  const classes = useStyles();
  const rows = [
    createData(props.averagePM[0][0], props.averagePM[0][1], props.averagePM[0][2], props.averagePM[0][3]),
    createData(props.averagePM[1][0], props.averagePM[1][1], props.averagePM[1][2], props.averagePM[1][3]),
    createData(props.averagePM[2][0], props.averagePM[2][1], props.averagePM[2][2], props.averagePM[2][3]),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

console.log(props.averagePM);
console.log(props.averagePM[0]);
console.log(props.averagePM[0].join())


  return (
    <>
      <h4>Average PM2.5 levels
        in {props.city}
      </h4>
      <div id="table">
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell align="right">2018</TableCell>
                <TableCell align="right">2019</TableCell>
                <TableCell align="right">2020</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );

}

export default averageTable