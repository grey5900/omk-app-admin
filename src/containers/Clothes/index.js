/**
 * Created by isaac on 2016/4/3.
 */
import React, {PropTypes} from 'react';
import {disableEvent} from 'utils/ui';
import {connect} from 'react-redux';
import {columnCreator} from './info';
import * as clothActions from 'redux/modules/cloth';
import {push} from 'react-router-redux';
import {Content, SortTableView} from 'components';
import {getPageCount} from 'utils/func';
import Helmet from 'react-helmet';
// import Loader from 'react-loader';

@connect(
  (state) => ({loading: state.cloth.loading}),
  {
    load: clothActions.load,
    pushState: push
  })
export default
class ClothListView extends Content {
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
      total: 0,
      currentPage: 0,
      collection: [],
      columns: columnCreator()
    };
  }

  componentWillMount() {
    const {currentPage, pageSize} = this.state;
    this.props.load({skip: currentPage * pageSize, limit: pageSize}, (response) => {
      if (response) {
        const {clothes, total} = response.data;
        const pageCount = getPageCount(total, pageSize);
        this.setState({
          total,
          totalPages: pageCount,
          collection: clothes,
          clothes
        });
      }
    });
  }

  gotoPage = (pageIndex) => {
    const {pageSize} = this.state;
    this.props.load({skip: pageIndex * pageSize, limit: pageSize}, (response) => {
      if (response) {
        const {clothes, total} = response.data;
        const pageCount = getPageCount(total, pageSize);
        this.setState({
          currentPage: pageIndex,
          totalPages: pageCount,
          total,
          collection: clothes,
          clothes
        });
      }
    });
  };

  render() {
    const name = '衣物信息';
    const {totalPages, total, currentPage, collection, columns, pageSize} = this.state;
    return (
      <div is="content" onContextMenu={disableEvent}>
        <Helmet title={name} />
        <div className="panel panel-default" is="panel">
          <div className="panel-heading" is="panelHead">
            <span className="panelTitle" is="panelTitle" >{name}<h4 className="ui blue header" style={{display: 'inline-block'}}>{`总计  ${total}`}</h4></span>
          </div>
          <div className="panel-body" is="panelbody">
            <SortTableView gotoPage={this.gotoPage}
                           currentPage={currentPage}
                           pageSize={pageSize}
                           pageCount={totalPages}
                           rows={collection}
                           columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}
