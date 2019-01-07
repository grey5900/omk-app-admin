/**
 * Created by isaac on 2016/4/3.
 */
import React, {PropTypes} from 'react';
import {disableEvent} from 'utils/ui';
import {connect} from 'react-redux';
import {columnCreator} from './info';
import {load} from 'redux/modules/device';
import {push} from 'react-router-redux';
import {Content, SortTableView} from 'components';
import {getPageCount} from 'utils/func';
import Loader from 'react-loader';
import {alertSuccess} from 'utils/ui';
import Helmet from 'react-helmet';

@connect(
  (state) => ({loaded: state.device.loaded}),
  {
    load,
    pushState: push
  })
export default
class DeviceListView extends Content {
  static propTypes = {
    loaded: PropTypes.bool,
    load: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      pageSize: 12,
      totalPages: 0,
      currentPage: 0,
      collection: [],
      columns: columnCreator(this.handleEditPatient, this.handleDeletePatient)
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

  handleAddPatient = (event) => {
    event.preventDefault();
    this.props.pushState('/patientadd');
  };

  handleDeletePatient = (model, event) => {
    event.preventDefault();
    this.props.deletePatient(model._id, () => {
      alertSuccess('删除成功!');
    });
  };

  handleEditPatient = (model, event) => {
    event.preventDefault();
    this.props.pushState(`/patient/${model._id}`);
  };

  deleteSelections = (model) => {
    const {closeModal} = this.props;
    const {currentPage, pageSize} = this.state;
    closeModal();
    this.props.deletePatient(model._id, {skip: currentPage * pageSize, limit: pageSize}, (error, response) => {
      if (response) {
        const {data} = response.data;
        this.setState({
          collection: data
        });
        alertSuccess('删除成功!');
      }
    });
  };

  searchCallback = (input) => {
    const {data} = this.state;
    const filterList = data.filter((item) => {
      return item.name.indexOf(input) !== -1;
    });
    this.setState({collection: filterList});
  };
  searchResetCallback = () => {
    this.setState({collection: this.state.data});
  };

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
    const name = '设备';
    const {totalPages, currentPage, collection, columns, pageSize} = this.state;
    const pageCount = getPageCount(totalPages, pageSize);
    return (
      <Loader loaded={!this.props.loading}>
        <div is="content" onContextMenu={disableEvent}>
          <Helmet title={name} />
          <div className="panel panel-default" is="panel">
            <div className="panel-heading" is="panelHead">
              <span className="panelTitle" >{name}<h4 className="ui blue header" style={{display: 'inline-block'}}>{`总计  ${totalPages}`}</h4></span>
            </div>
            <div className="panel-body" is="panelbody">
              <SortTableView enableSearch
                             gotoPage={this.gotoPage}
                             currentPage={currentPage}
                             pageCount={pageCount}
                             rows={collection}
                             columns={columns}
                             searchCallback={this.searchCallback}
                             searchResetCallback={this.searchResetCallback}
                             placeholder="请输入待检索信息" />
            </div>
          </div>
        </div>
      </Loader>
    );
  }
}
