import React, { Component } from 'react';

import PropTypes from 'prop-types';
// import { MuiThemeProvider, theme } from '../../styles/material-styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { resources } from '../../helper/configLocalization.js';
import ButtonEdit from './ButtonEdit';
import CustomSearchRender from './ButtonSearch';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
// MUI Table
import MUIDataTable from 'mui-datatables';
import ButtonUpdate from './ButtonUpdate';
import ButtonAdd from './ButtonAdd';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default class ProductTable extends Component {
  static propTypes = {};

  getMuiTheme = () =>
    createMuiTheme({
      palette: {
        primary: {
          main: '#A3305A',
        },
        secondary: {
          main: '#A3305A',
        },
      },
      overrides: {
        MUIDataTable: {
          responsiveScroll: {maxHeight: 'scrollHeight' },
          root: {
            backgroundColor: '#FF000',
          },
        },
        MUIDataTableBodyCell: {
          root: {
            fontFamily: 'Suthasinee',
          },
        },
        MUIDataTableHeadCell: {
          root: {
            fontFamily: 'Suthasinee',
            fontSize: '14px',
            fontWeight: 'bold',
          },
        },
        MuiTypography: {
          caption: {
            fontFamily: 'Suthasinee',
          },
        },
      },
    });

  constructor(props) {
    super(props);

    this.state = {
      rowEdit: {
        id: '',
        productName: '',
        description: '',
        img: '',
      },
      rowsSelected: '',
      selectSent: [],
      data: [],
      opened: false,
    };
    this.toggleBox = this.toggleBox.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
  }

  handleClose() {
    const { opened } = this.state;
    this.setState({
      opened: false,
    });
  }

  handleOpen() {
    this.setState({
      openEdit: true,
    });
  }

  render() {
    const reload = this.props.reload;
    const { data } = this.props;
    const options = {
      print: false,
      filter: false,
      download: false,
      viewColumns: false,
      fixedHeader: false,
      responsive: 'scrollMaxHeight',
      rowsPerPageOptions: [10, 25, 50, 100],
      customToolbarSelect: (selectedRows, tableMeta, setSelectedRows) => (
        <ButtonUpdate
          reload={reload}
          id={this.state.selectSent}
          selectedRows={selectedRows}
          tableMeta={tableMeta.rowIndex}
          setSelectedRows={setSelectedRows}
        />
      ),
      textLabels: {
        body: {
          noMatch: 'Sorry we could not find any records!',
        },
        selectedRows: {
          text: "row selected",
        },
      },

      selectableRows: true,
      selectableRowsOnClick: false,
      rowsSelected: this.state.rowsSelected,
      onRowsSelect: (rowsSelected, allRows) => {
        this.setState({
          rowsSelected: allRows.map(item => item.dataIndex),
        });
        const dataToState = allRows.map(item => {
          return data[item.index]['id'];
        });
        this.setState({
          selectSent: dataToState,
        });
        console.log(this.state.selectSent, 'selected');
      },

      customToolbar: (value, tableMeta, updateValue) => {
        return <ButtonAdd reload={reload} />;
      },
      customSearchRender: (searchText, handleSearch, hideSearch, options) => {
        return (
          <CustomSearchRender
            searchText={searchText}
            onSearch={handleSearch}
            onHide={hideSearch}
            options={options}
          />
        );
      },
    };

    const columns = [
      { name: 'id', lable: 'id', options: { sort: true, filter: true, display: false } },
      {
        name: 'productName',
        lable: 'productName',
        options: {
          customHeadRender: ({ index, name, ...column }, sortColumn) => {
            console.log(column, 'v');
            return (
              <TableCell
                onClick={() => sortColumn(index)}
                key={index}
                style={
                  column.sortDirection === 'none'
                    ? {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                      }
                    : {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                        color: 'Black',
                      }
                }
              >
                <b>ชื่อสินค้า</b>
                <TableSortLabel
                  active={column.sortDirection !== 'none'}
                  direction={column.sortDirection || 'asc'}
                />
              </TableCell>
            );
          },
          sort: true,
          filter: true,
        },
      },
      { name: 'Description', lable: 'description', options: {   customHeadRender: ({ index, name, ...column }, sortColumn) => {
            console.log(column, 'v');
            return (
              <TableCell
                onClick={() => sortColumn(index)}
                key={index}
                style={
                  column.sortDirection === 'none'
                    ? {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                      }
                    : {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                        color: 'Black',
                      }
                }
              >
                <b>คำอธิบาย</b>
                <TableSortLabel
                  active={column.sortDirection !== 'none'}
                  direction={column.sortDirection || 'asc'}
                />
              </TableCell>
            );
          },sort: true } },
      {
        name: 'type',
        lable: 'type',
        options: {
          customHeadRender: ({ index, name, ...column }, sortColumn) => {
            console.log(column, 'v');
            return (
              <TableCell
                onClick={() => sortColumn(index)}
                key={index}
                style={
                  column.sortDirection === 'none'
                    ? {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                      }
                    : {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                        color: 'Black',
                      }
                }
              >
                <b>ประเภท</b>
                <TableSortLabel
                  active={column.sortDirection !== 'none'}
                  direction={column.sortDirection || 'asc'}
                />
              </TableCell>
            );
          },
          sort: true,
        },
      }, 
       {
        name: 'price',
        lable: 'price',
        options: {
          customHeadRender: ({ index, name, ...column }, sortColumn) => {
            console.log(column, 'v');
            return (
              <TableCell
                onClick={() => sortColumn(index)}
                key={index}
                style={
                  column.sortDirection === 'none'
                    ? {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                      }
                    : {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                        color: 'Black',
                      }
                }
              >
                <b>ราคา</b>
                <TableSortLabel
                  active={column.sortDirection !== 'none'}
                  direction={column.sortDirection || 'asc'}
                />
              </TableCell>
            );
          },
          sort: true,
          display: true,
        },
      },     
      {
        name: 'Status',
        lable: 'status',
        options: {
          customHeadRender: ({ index, name, ...column }, sortColumn) => {
            console.log(column, 'v');
            return (
              <TableCell
                onClick={() => sortColumn(index)}
                key={index}
                style={
                  column.sortDirection === 'none'
                    ? {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                      }
                    : {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                        color: 'Black',
                      }
                }
              >
                <b>สถานะ</b>
                <TableSortLabel
                  active={column.sortDirection !== 'none'}
                  direction={column.sortDirection || 'asc'}
                />
              </TableCell>
            );
          },
          sort: true,
          display: true,
        },
      },    
      {
        name: 'Edit',
        options: {
          sort: false,
           customHeadRender: ({ index, name, ...column }, sortColumn) => {
            console.log(column, 'v');
            return (
              <TableCell
                style={
                  column.sortDirection === 'none'
                    ? {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                      }
                    : {
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontFamily: 'Suthasinee',
                        color: 'Black',
                      }
                }
              >
                <b>แก้ไข</b>
              </TableCell>
            );
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <ButtonEdit
                onClick={() =>
                  this.setState({
                    rowEdit: {
                      id: tableMeta.rowData[0],
                      productName: tableMeta.rowData[1],
                      description: tableMeta.rowData[2],
                      imageUrl: tableMeta.rowData[5],
                      consumerPoint: tableMeta.rowData[7],
                    },
                  })
                }
                reload={reload}
                data={this.state.rowEdit}
              />
            );
          },
        },
      },
    ];
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    );
  }
}
