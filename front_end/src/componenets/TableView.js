import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { dateFilter } from 'react-bootstrap-table2-filter';
import { Row, Col, Container } from 'react-bootstrap'

const TableView = () => {
    const { SearchBar, ClearSearchButton } = Search;
    const [userData, setUserData] = useState([]);
    const [rowTotal, setRowTotal] = useState(0);
    const [rowSum, setRowSum] = useState(0);
    const tableRef = useRef();
    const columns = [{
        text: 'Order Name',
        dataField: 'order_name',
    },
    {
        text: 'Product',
        dataField: 'product',
    },
    {
        text: 'Customer Company',
        dataField: 'customer_company',
        searchable: false
    },
    {
        text: 'Customer',
        dataField: 'customer',
        searchable: false
    },
    {
        text: 'Created',
        dataField: 'created',
        searchable: false,
        filter: dateFilter(),
        headerStyle: (colum, colIndex) => {
            return { width: '30%', textAlign: 'justify' };
        }
        // sort: true,
        // sortCaret: (order, column) => {
        //     if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
        //     else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="red">Asc</font></span>);
        //     else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="red">Desc</font>/Asc</span>);
        //     return null;
        // }
    },
    {
        text: 'Delivered Amount',
        dataField: 'deliveredAmount',
        // formatter: priceFormatter,
        searchable: false
    },
    {
        text: 'Total',
        dataField: 'total',
        searchable: false
    }]
    // const afterFilter = (newResult, newFilters) => {
    //     console.log(newResult)
    //     console.log(newFilters)
    // }
    const url = "http://localhost:5000"
    useEffect(() => {
        console.log("calling /get_order")
        axios
            .get(url + "/get_order")
            .then((response) => {
                const tempUserData = []
                let rowSumTemp = 0;
                console.log("response", response);
                response.data.map((item) => {
                    item['id'] = Math.random()
                    tempUserData.push(item);
                    rowSumTemp = parseFloat(rowSumTemp) + parseFloat(item.total.replace("$", ""));
                });
                setUserData(tempUserData);
                setRowTotal(tempUserData.length);
                setRowSum(rowSumTemp);
            })
            .catch((error) => {

            });
    }, []);
    // const setTotalAMount = (data) => {
    //     var sum = 0
    //     data.forEach(function (item) {
    //         // console.log(parseFloat(item.total.split('$')[1]))
    //         sum += parseFloat(item.total.split('$')[1])
    //     })
    //     sum = Math.round((sum + Number.EPSILON) * 100) / 100
    //     console.log("calling in useEffect")
    //     setTotal(sum)
    // }
    // document.getElementsByClassName("table")[0] && handleGetCurrentData()


    const options = {
        custom: true,
        // totalSize: userData.length,
        sizePerPage: 5,
    };

    // const handleGetCurrentData = () => {
    //     console.log(tableRef.handleGetCurrentData());
    // }

    const afterSearch = (searchData) => {
        setRowTotal(searchData.length);
        let rowSumTemp = 0;
        searchData.map(item => {
            rowSumTemp = parseFloat(rowSumTemp) + parseFloat(item.total.replace("$", ""))
        })
        setRowSum(rowSumTemp);
    };
    // const clearAmount = (props) => {

    //     setTotal(0)
    // };
    // const handleGetCurrentData = () => {
    //     let total = 0
    //     if (document.getElementsByClassName("table")[0]) {
    //         const tble = document.getElementsByClassName("table")[0]
    //         const tBody = tble.getElementsByTagName('tbody')[0]
    //         console.log(tBody)
    //         if (tBody && tBody.getElementsByTagName('tr')) {
    //             let trows = tBody.getElementsByTagName('tr')
    //             if (trows[0].getElementsByTagName('td')[6]) {
    //                 for (var i = 0; i < trows.length; i++) {
    //                     // var trs = trows.getElementsByTagName("tr")[i];
    //                     // var cellVal = trs.cells[0]
    //                     console.log(parseFloat(trows[i].getElementsByTagName('td')[6].innerText.split("$")[1]))
    //                     total += parseFloat(trows[i].getElementsByTagName('td')[6].innerText.split("$")[1])
    //                 }
    //                 total = Math.round((total + Number.EPSILON) * 100) / 100
    //                 setTotal(total)
    //             }

    //         }
    //         else {
    //             setTotal(0)
    //         }


    //     }
    //     console.log(total)
    // }


    return (
        <>
            <div>
                {userData.length > 0 &&
                    <PaginationProvider
                        pagination={paginationFactory(options)}>
                        {
                            ({
                                paginationProps,
                                paginationTableProps
                            }) => (
                                    <div>

                                        <ToolkitProvider
                                            keyField='id'
                                            data={userData}
                                            columns={columns}
                                            pagination={paginationFactory()}
                                            striped
                                            hover
                                            condensed
                                            search={{ afterSearch }}
                                        // ref={n => this.toolkit = n}


                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <Row style={{ "padding": "30px", "justifyContent": "space-around" }}>

                                                            <SearchBar style={{ "width": "300%" }} {...props.searchProps} />
                                                            <ClearSearchButton {...props.searchProps} className={"clear"}/>
                                                        </Row>

                                                        {/* <button onClick={(e) => { props.searchProps.onClear(e); setTotal(0) }}  >clear me</button> */}
                                                        <Row>
                                                            <h3> Total:$ {rowSum}</h3>
                                                        </Row>

                                                        <BootstrapTable
                                                            {...props.baseProps}
                                                            {...paginationTableProps}
                                                            filter={filterFactory()}
                                                            noDataIndication="No data"
                                                            ref={tableRef}


                                                        />
                                                    </div>
                                                )
                                            }
                                        </ToolkitProvider>
                                        <PaginationListStandalone
                                            {...paginationProps} />
                                    </div>
                                )
                        }
                    </PaginationProvider>



                }
                Total rows: {rowTotal}
            </div>
        </>
    )

};
export default TableView;