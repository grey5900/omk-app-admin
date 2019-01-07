/**
 * Created by isaac on 16/8/13.
 */
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {openAlert, openModal} from 'redux/modules/ui';
import {alertSuccess} from 'utils/ui';
import {getHelp, updateHelp, addHelp} from 'redux/modules/help';

import {NormalButton, FormInput, SortTableView} from 'components';
import columnCreator from './columns';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    right: '25%',
    bottom: '25%',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};

@connect(
  () => ({}),
  {
    openAlert, openModal, getHelp, updateHelp, addHelp,
    pushState: push
  })
export default
class HelpView extends Component {
  static propTypes = {
    openAlert: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    getHelp: PropTypes.func.isRequired,
    updateHelp: PropTypes.func.isRequired,
    addHelp: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      help: {list: []},
      columns: columnCreator(this._handleEdit, this._handleDelete),
      selected: -1
    };
  }

  componentWillMount() {
    this.props.getHelp((response) => {
      this.setState({help: response.data});
    });
  }
  _handleAdd = () => {
    const {help: {list}} = this.state;
    const selected = list.length;
    this.setState({selected, modalIsOpen: true});
  };
  _handleEdit = (model, index) => {
    this.setState({selected: index, modalIsOpen: true});
  };
  _onChange = (event) => {
    const {name, value} = event.target;
    const {selected} = this.state;
    const help = {...this.state.help};
    let obj = help.list[selected];
    if (!obj) {
      obj = {};
      help.list[selected] = obj;
    }
    obj[name] = value;
    this.setState({help});
  };

  _handleDelete = (model, index) => {
    const help = {...this.state.help};
    help.list.splice(index, 1);
    this.props.updateHelp({id: help._id, args: {list: help.list}}, () => {
      this.setState({help});
      alertSuccess('修改成功!');
    });
  };
  closeModal = () => {
    this.setState({modalIsOpen: false, selected: -1});
  };
  _handleSave = () => {
    const {help} = this.state;
    if (help._id) {
      this.props.updateHelp({id: help._id, args: {list: help.list}}, () => {
        this.closeModal();
        alertSuccess('保存成功!');
      });
    } else {
      this.props.addHelp({list: help.list}, () => {
        this.closeModal();
        alertSuccess('新增成功!');
      });
    }
  };

  render() {
    const name = '数据维护';
    const {help, selected, modalIsOpen, columns} = this.state;
    const data = help ? help.list : [];
    const style = {
      height: '40px',
      marginTop: '5px'
    };
    let selectedRow = {};
    if (data.length > 0 && selected !== -1) {
      selectedRow = data[selected] || {};
    }
    return (
      <div className="ag-fresh uhs-content" >
        <Helmet title={name} />
        <div className="full-height" style={{margin: 0}} >
          <div className="panel panel-default" >
            <div className="panel-heading" style={style} >
              <div className="toolbarRight" >
                <NormalButton onClick={this._handleAdd} >新增</NormalButton>
              </div>
            </div>
            <div className="panel-body" >
              <SortTableView columns={columns} rows={data} />
            </div>
          </div>
        </div>
        {modalIsOpen &&
        <Modal isOpen={modalIsOpen} onRequestClose={this.closeModal} style={customStyles} >
          <div className="ui form">
            <FormInput label="标题" value={selectedRow.title} name="title" onChange={this._onChange} />
            <FormInput label="URL" value={selectedRow.url} name="url" onChange={this._onChange} />
            <div className="field" >
              <NormalButton onClick={this._handleSave} >保存</NormalButton>
              <NormalButton onClick={this.closeModal} >取消</NormalButton>
            </div>
          </div>
        </Modal>
        }
      </div>
    );
  }
}
