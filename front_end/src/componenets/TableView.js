import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from 'react-bootstrap-table2-filter';
import { Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from 'react-dates';

const TableView = () => {
    const { SearchBar, ClearSearchButton } = Search;
   
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

   


    const [focusedInput, setFocusedInput] = useState(null);
    const [userData, setUserData] = useState([]);
    const [rowTotal, setRowTotal] = useState(0);
    const [rowSum, setRowSum] = useState(0);
    const [permData, setPermData] = useState([]);
    const tableRef = useRef();

    const dateFormatter = (cell) => {
        return (<span>{moment(cell).format('MMM Do, h:mm a')}</span>)
    }

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
        formatter: dateFormatter,
        sort: true,
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="red">Asc</font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="red">Desc</font>/Asc</span>);
            return null;
        }
    },
    {
        text: 'Delivered Amount',
        dataField: 'deliveredAmount',
        searchable: false
    },
    {
        text: 'Total',
        dataField: 'total',
        searchable: false
    }]



    // const onDateCLose = () => {
    //     //console.log(dateRange)

    //     var tempArr = []
    //     let tempData = permData

    //     tempData.forEach(function (obj) {

    //         let tempDate = moment(obj.created).format('YYYY MM DD')
    //         // console.log(typeof (tempDate), tempDate)
    //         let start = moment(startDate).format('YYYY MM DD')
    //         //let start = moment(dateRange.startDate).format('YYYY MM DD')
    //         // console.log(typeof (start), start)
    //         let end = moment(endDate).format('YYYY MM DD')
    //         //let end = moment(dateRange.endDate).format('YYYY MM DD')
    //         // console.log(typeof (end), end)

    //         if (moment(tempDate).isAfter(start) && moment(tempDate).isBefore(end)) {
    //             // console.log("rowObj", obj)
    //             tempArr.push(obj)
    //         }

    //     })

    //     setUserData(tempArr)
    //     // console.log(userData.length)
    //     setRowTotal(tempArr.length);
    // }

    useEffect(() => {
        //console.log(dateRange)
        if (startDate != null && endDate != null) {
            var tempArr = []
            let tempData = permData

            tempData.forEach(function (obj) {
                // console.log(moment(obj.created).isAfter(startDate))
                let tempDate = moment(obj.created).format('YYYY MM DD')
                // console.log(typeof (tempDate), tempDate)
                let start = moment(startDate).format('YYYY MM DD')
                //let start = moment(dateRange.startDate).format('YYYY MM DD')
                // console.log(typeof (start), start)
                let end = moment(endDate).format('YYYY MM DD')
                //let end = moment(dateRange.endDate).format('YYYY MM DD')
                // console.log(typeof (end), end)
                // console.log("tempDate", tempDate, "start", start, "end", end)
                // console.log(moment(tempDate).isAfter(start))
                if (moment(tempDate).isAfter(start) && moment(tempDate).isBefore(end)) {
                    console.log("rowObj", obj)
                    tempArr.push(obj)
                }

            })

            if (tempArr.length > 0) {
                setUserData(tempArr)
                // console.log(userData.length)
                setRowTotal(tempArr.length);
            } else {
                alert("No Data in the given date range!")
                setEndDate(null);
                setStartDate(null);
            }


        }
    }, [startDate, endDate]);



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
                tempUserData.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return c - d;
                });
                setMinDate(moment(tempUserData[0].created))
                setMaxDate(moment(tempUserData[tempUserData.length - 1].created))
                setPermData(tempUserData);
                setUserData(tempUserData);
                setRowTotal(tempUserData.length);
                setRowSum(rowSumTemp);
            })
            .catch((error) => {

            });
    }, []);



    const options = {
        custom: true,
        // totalSize: userData.length,
        sizePerPage: 5,
    };


    const afterSearch = (searchData) => {
        setRowTotal(searchData.length);
        let rowSumTemp = 0;
        searchData.map(item => {
            rowSumTemp = parseFloat(rowSumTemp) + parseFloat(item.total.replace("$", ""))
        })
        setRowSum(rowSumTemp);
    };
    const refreshTable = () => {

        setUserData(permData)

        setRowTotal(permData.length);
    }

    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };
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
                                                            <Col md={{ span: -1, offset: 0 }}>
                                                                <SearchBar style={{ "width": "250%", "float": "left" }} {...props.searchProps} />
                                                            </Col>
                                                            <Col md={{ span: 1, offset: 0 }}>
                                                                <ClearSearchButton {...props.searchProps} className={"clear"} />
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col md={{ span: -1, offset: 0 }}>
                                                                <DateRangePicker

                                                                    endDate={endDate} // momentPropTypes.momentObj or null,
                                                                    startDate={startDate} // momentPropTypes.momentObj or null,
                                                                    startDateId="startDate" // PropTypes.string.isRequired,
                                                                    endDateId="endDate" // PropTypes.string.isRequired,
                                                                    onDatesChange={handleDatesChange}// PropTypes.func.isRequired,
                                                                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                                                                    displayFormat={'DD/MM/YYYY'}
                                                                    isOutsideRange={() => false}
                                                                />
                                                            </Col>
                                                            <Col md={{ span: 1, offset: 0 }}>
                                                                <Button onClick={refreshTable} variant="secondary" size="lg" active>
                                                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                                                </Button>
                                                            </Col>
                                                        </Row>

                                                        <br />

                                                        <Row>
                                                            <h3 data-testid="rowCount"> Total:${rowSum}
                                                            </h3>
                                                        </Row>

                                                        <BootstrapTable
                                                            {...props.baseProps}
                                                            {...paginationTableProps}
                                                            filter={filterFactory()}
                                                            noDataIndication="No data"
                                                            ref={tableRef}
                                                            striped
                                                            hover
                                                            condensed
                                                            defaultSorted


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