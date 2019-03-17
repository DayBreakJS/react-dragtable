import React, { Component } from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import ReactDragListView from "react-drag-listview"
import './DragTable.css'
import 'antd/dist/antd.css'


const ResizeableTitle = (props) => {
  console.log(props)
  const { onResize, width, ...restProps } = props;

  if (!width) return <th {...restProps} />

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  )
}

class DragTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: 0,
        date: '2018-02-11',
        amount: 120,
        type: 'income',
        note: 'transfer',
      }, {
        key: 1,
        date: '2018-03-11',
        amount: 243,
        type: 'income',
        note: 'transfer',
      }, {
        key: 2,
        date: '2018-04-11',
        amount: 98,
        type: 'income',
        note: 'transfer',
      }],
      columns: [{
        title: <div className="drag">Date</div>,
        dataIndex: 'date',
        width: 200,
      }, {
        title: <div className="drag">Amount</div>,
        dataIndex: 'amount',
        width: 100,
      }, {
        title: <div className="drag">Type</div>,
        dataIndex: 'type',
        width: 100,
      }, {
        title: <div className="drag">Note</div>,
        dataIndex: 'note',
        width: 100,
      }, {
        title: <div className="drag">Action</div>,
        key: 'action',
        render: () => (
          <a href="javascript:;">Delete</a>
        ),
      }],
    };

    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = that.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns
        });
      },
      nodeSelector: "th",
      handleSelector: '.drag',
    };
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  render() {
    const { data }=this.state
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
      <div className="App">
        <header className="App-header">
          <ReactDragListView.DragColumn {...this.dragProps}>
            <Table
              columns={columns}
              pagination={false}
              components={this.components}
              dataSource={data}
              bordered
            />
          </ReactDragListView.DragColumn>
        </header>
      </div>
    );
  }
}

export default DragTable;
