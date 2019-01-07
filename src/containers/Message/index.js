/**
 * Created by isaac on 2016/4/3.
 */
import React, {PropTypes} from 'react';
import {disableEvent, alertSuccess} from 'utils/ui';
import {connect} from 'react-redux';
import {columnCreator} from './info';
import * as actions from 'redux/modules/message';
import {push} from 'react-router-redux';
import {Content, NormalButton, SortTableView} from 'components';
import {getPageCount} from 'utils/func';
import Loader from 'react-loader';

@connect(
  (state) => ({loading: state.message.loading}),
  {
    ...actions,
    pushState: push
  })
export default
class MessageListView extends Content {
  static propTypes = {
    loaded: PropTypes.bool,
    pushState: PropTypes.func.isRequired,
    listMessage: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired
  };
  state = {
    pageSize: 12,
    totalPages: 0,
    currentPage: 0,
    collection: [],
    columns: []
  };

  componentDidMount() {
    const {currentPage, pageSize} = this.state;
    this._loadPage(currentPage, (response) => {
      if (response) {
        const {total, data} = response.data;
        this.setState({
          total,
          totalPages: getPageCount(total, pageSize),
          currentPage,
          collection: data,
          columns: columnCreator(this.handleEditMessage, this.handleDeleteMessage)
        });
      }
    });
  }

  _loadPage(pageIndex, callback) {
    const {pageSize} = this.state;
    this.props.listMessage({skip: pageIndex * pageSize, limit: pageSize}, callback);
  }

  handleAddMessage = (event) => {
    event.preventDefault();
    this.props.pushState('/message/add');
  };

  handleDeleteMessage = (model, event) => {
    event.preventDefault();
    console.log(model);
    this.props.deleteMessage(model._id, (response) => {
      console.log(response);
      alertSuccess('删除成功!');
    });
  };

  handleEditMessage = (model, event) => {
    event.preventDefault();
    this.props.pushState(`/message/${model._id}`);
  };

  gotoPage = (index) => {
    this._loadPage(index, (response) => {
      if (response) {
        const {data} = response.data;
        this.setState({
          currentPage: index,
          collection: data
        });
      }
    });
  };

  render() {
    const name = '信息';
    const {totalPages, total, currentPage, collection, columns, pageSize} = this.state;
    return (
      <Loader loaded={!this.props.loading} >
        <div is="content" onContextMenu={disableEvent} >
          <div className="panel panel-default" is="panel" >
            <div className="panel-heading" is="panelHead" >
              <span className="panelTitle" >{name}<h4 className="ui blue header" style={{display: 'inline-block'}}>{`总计  ${total}`}</h4></span>
              <div className="pull-right" >
                <NormalButton onClick={this.handleAddMessage} >新建消息</NormalButton>
              </div>
            </div>
            <div className="panel-body" is="panelbody" >
              <SortTableView gotoPage={this.gotoPage}
                             pageCount={totalPages}
                             currentPage={currentPage}
                             pageSize={pageSize}
                             rows={collection}
                             columns={columns} />
            </div>
          </div>
        </div>
      </Loader>
    );
  }
}
