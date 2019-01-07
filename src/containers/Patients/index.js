/**
 * Created by isaac on 2/24/16.
 */
import React, {PropTypes} from 'react';
import {disableEvent} from 'utils/ui';
import {connect} from 'react-redux';
import {columnCreator} from './info';
import {load, searchPatient, exportAll} from 'redux/modules/patient';
import {push} from 'react-router-redux';
import {NormalButton, Content, SortTableView} from 'components';
import {getPageCount} from 'utils/func';
import {closeModal as _closeModal, openModal as _openModal, openAlert} from 'redux/modules/ui';

@connect(
  (state) => ({
    loaded: state.patient.loaded,
    user: state.auth.user
  }),
  {
    load,
    searchPatient,
    exportAll,
    openModal: _openModal,
    closeModal: _closeModal,
    openAlert,
    pushState: push
  })
export default
class Patients extends Content {
  static propTypes = {
    loaded: PropTypes.bool,
    load: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    openAlert: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    exportAll: PropTypes.func.isRequired,
    // loadPatient: PropTypes.func.isRequired,
    // countPatient: PropTypes.func.isRequired,
    searchPatient: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      pageSize: 10,
      total: 0,
      totalPages: 0,
      currentPage: 0,
      collection: [],
      columns: columnCreator(this.handleEditPatient),
      input: null
    };
  }

  componentWillMount() {
    const {currentPage, pageSize} = this.state;
    this.props.load({skip: currentPage * pageSize, limit: pageSize}, (response) => {
      const {patients, total} = response.data;
      const pageCount = getPageCount(total, pageSize);
      this.setState({
        totalPages: pageCount,
        total,
        collection: patients,
        patients
      });
    });
  }

  _loadPage(pageIndex, callback) {
    if (this.props.user) {
      const {pageSize} = this.state;
      this.props.load({skip: pageIndex * pageSize, limit: pageSize}, callback);
    }
  }

  handleAddPatient = (event) => {
    event.preventDefault();
    this.props.pushState('/patient/add');
  };
  handleEditPatient = (model, event) => {
    event.preventDefault();
    this.props.pushState(`/patient/${model._id}`);
  };

  gotoPage = (index) => {
    const {search, totalPages} = this.state;
    if (index >= 0 && index < totalPages) {
      if (search && search.length > 0) {
        // search mode
        this._loadSearch(search, index, ({data}) => {
          const {patients} = data;
          this.setState({
            currentPage: index,
            collection: patients
          });
        });
      } else {
        this._loadPage(index, ({data}) => {
          const {patients} = data;
          this.setState({
            currentPage: index,
            collection: patients
          });
        });
      }
    }
  };
  _loadSearch = (input, index, callback) => {
    const {pageSize} = this.state;
    this.props.searchPatient({skip: index * pageSize, limit: pageSize, search: input}, callback);
  };
  searchCallback = (input) => {
    const {pageSize} = this.state;
    const index = 0;
    this._loadSearch(input, index, (response) => {
      const {total, patients} = response.data;
      const pageCount = getPageCount(total, pageSize);
      this.setState({
        search: input,
        total,
        totalPages: pageCount,
        currentPage: index,
        collection: patients
      });
    });
  };
  searchResetCallback = () => {
    const index = 0;
    const {pageSize} = this.state;
    this._loadPage(index, (response) => {
      const {total, patients} = response.data;
      this.setState({
        total,
        totalPages: getPageCount(total, pageSize),
        currentPage: index,
        collection: patients,
        search: null
      });
    });
  };

  _handleExport = (event) => {
    event.preventDefault();
    this.props.exportAll();
    window.open('/api/patient/summary');
  };

  render() {
    const name = '患者列表';
    const {totalPages, total, currentPage, collection, columns, pageSize} = this.state;
    const style = {
      height: '40px',
      marginTop: '5px'
    };
    return (
      <div className="uhs-content" onContextMenu={disableEvent} >
        <div className="panel panel-default" >
          <div className="panel-heading" style={style} >
            <span className="panelTitle" >{name}<h4 className="ui blue header" style={{display: 'inline-block'}}>{`总计  ${total}`}</h4></span>
            <div className="toolbarRight" >
              <NormalButton onClick={this._handleExport} >导出统计结果</NormalButton>
            </div>
          </div>
          <div className="panel-body" >
            <SortTableView enableSearch
                           gotoPage={this.gotoPage}
                           currentPage={currentPage}
                           pageSize={pageSize}
                           pageCount={totalPages}
                           rows={collection}
                           columns={columns}
                           searchCallback={this.searchCallback}
                           searchResetCallback={this.searchResetCallback}
                           placeholder="请输入患者姓名、手机号或身份证号进行搜索" />
          </div>
        </div>
      </div>
    );
  }
}
