/**
 * Created by isaac on 2016/4/3.
 */
import React, {PropTypes} from 'react';
import {disableEvent} from 'utils/ui';
import {connect} from 'react-redux';
import {columnCreator} from './info';
import {load} from 'redux/modules/feedback';
import {push} from 'react-router-redux';
import {Content, SortTableView} from 'components';
import {getPageCount} from 'utils/func';
import Loader from 'react-loader';

@connect(
  (state) => ({loading: state.feedback.loading}),
  {
    load,
    pushState: push
  })
export default
class FeedbackListView extends Content {
  static propTypes = {
    loading: PropTypes.bool,
    load: PropTypes.func,
    pushState: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      pageSize: 12,
      totalPages: 0,
      currentPage: 0,
      collection: [],
      columns: columnCreator()
    };
  }

  componentWillMount() {
    const {currentPage, pageSize} = this.state;
    this.props.load({skip: currentPage * pageSize, limit: pageSize}, (response) => {
      if (response) {
        const {data, total} = response.data;
        this.setState({
          totalPages: total,
          collection: data
        });
      }
    });
  }

  gotoPage = (pageIndex) => {
    const {pageSize} = this.state;
    this.props.load({skip: pageIndex * pageSize, limit: pageSize}, (response) => {
      if (response) {
        const {data, total} = response.data;
        this.setState({
          currentPage: pageIndex,
          totalPages: total,
          collection: data
        });
      }
    });
  };

  render() {
    const name = '反馈';
    const {totalPages, currentPage, collection, columns, pageSize} = this.state;
    const pageCount = getPageCount(totalPages, pageSize);
    return (
      <Loader loaded={!this.props.loading}>
        <div is="content" onContextMenu={disableEvent}>
          <div className="panel panel-default" is="panel">
            <div className="panel-heading" is="panelHead">
              <span is="panelTitle">{name}</span>
            </div>
            <div className="panel-body" is="panelbody">
              <SortTableView gotoPage={this.gotoPage}
                             currentPage={currentPage}
                             pageCount={pageCount}
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
