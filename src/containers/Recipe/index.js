/**
 * Created by isaac on 2016/4/3.
 */
import {connect} from 'react-redux';
import React, {PropTypes} from 'react';

import { FormInput } from 'components';
import {disableEvent, alertSuccess} from 'utils/ui';

import {columnCreator} from './info';

import * as actions from 'redux/modules/recipe';
import {push} from 'react-router-redux';
import {Content, NormalButton, SortTableView} from 'components';
import {getPageCount} from 'utils/func';
import Loader from 'react-loader';
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
    left: '10%',
    right: '10%',
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
  (state) => ({loading: state.message.loading}),
  {
    ...actions,
    pushState: push
  })
export default
class RecipeListView extends Content {
  static propTypes = {
    loaded: PropTypes.bool,
    pushState: PropTypes.func.isRequired,
    listRecipe: PropTypes.func.isRequired,
    addRecipe: PropTypes.func.isRequired,
    updateRecipe: PropTypes.func.isRequired,
    deleteRecipe: PropTypes.func.isRequired
  };
  state = {
    pageSize: 12,
    totalPages: 0,
    currentPage: 0,
    collection: [],
    columns: [],
    modal: false
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
          columns: columnCreator(this.handleEditRecipe, this.handleDeleteRecipe)
        });
      }
    });
  }

  _loadPage(pageIndex, callback) {
    const {pageSize} = this.state;
    this.props.listRecipe({skip: pageIndex * pageSize, limit: pageSize}, callback);
  }

  handleAddRecipe = () => {
    this.setState({
      modal: true,
      recipe: {detail: ['']}
    });
  };

  handleDeleteRecipe = (model, event) => {
    event.preventDefault();
    console.log(model);
    this.props.deleteRecipe(model._id, (response) => {
      console.log(response);
      alertSuccess('删除成功!');
      this._loadPage(this.state.currentPage, (dataresponse) => {
        console.log(dataresponse);
        const {total, data} = dataresponse.data;
        this.setState({
          total,
          totalPages: getPageCount(total, this.state.pageSize),
          collection: data,
          modal: false,
        });
      });
    });
  };

  handleEditRecipe = (model) => {
    this.setState({
      modal: true,
      recipe: model
    });
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
  onRequestClose = () => {
    this.setState({
      modal: false
    });
  };
  handleCancel = this.onRequestClose;

  changeDetail = (index, event) => {
    console.log('change detail', index, event.target.value);
    const recipeChange = this.state.recipe;
    recipeChange.detail[index] = event.target.value;
    this.setState({
      recipe: recipeChange
    });
  }
  handleSave = (event) => {
    event.preventDefault();
    const {recipe, pageSize} = this.state;
    if (recipe._id) {
      // update recipe
      this.props.updateRecipe({id: recipe._id, args: recipe}, (response) => {
        console.log(response);
        alertSuccess('更新成功!');
        this._loadPage(this.state.currentPage, () => {
          this.setState({
            modal: false,
          });
        });
      });
    } else {
      this.props.createRecipe(recipe, (response) => {
        console.log(response);
        alertSuccess('创建成功!');
        this._loadPage(this.state.currentPage, (dataresponse) => {
          console.log(dataresponse);
          const {total, data} = dataresponse.data;
          this.setState({
            total,
            totalPages: getPageCount(total, pageSize),
            collection: data,
            modal: false,
          });
        });
      });
    }
  };
  deleteItem = (index, event) => {
    event.preventDefault();
    const recipeChange = this.state.recipe;
    recipeChange.detail.splice(index, 1);
    if (recipeChange.detail.length === 0) {
      recipeChange.detail.push('');
    }
    this.setState({
      recipe: recipeChange
    });
  }
  addMore = () => {
    const recipeChange = this.state.recipe;
    recipeChange.detail.push('');
    console.log('addMore', recipeChange);
    this.setState({
      recipe: recipeChange
    });
  }
  changeRecipe = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    const recipeChange = this.state.recipe;
    recipeChange[name] = value;
    this.setState({
      recipe: recipeChange
    });
  }
  render() {
    const name = '食谱';

    const recipeOptions = [
      {value: '', name: ''},
      {value: 'breakfast', name: '早餐'},
      {value: 'meal', name: '中/晚餐'},
      {value: 'dessert', name: '点心'},
    ];
    const {modal, recipe, totalPages, total, currentPage, collection, columns, pageSize} = this.state;
    return (
      <Loader loaded={!this.props.loading} >
        {!modal &&
        <div is="content" onContextMenu={disableEvent} >
          <div className="panel panel-default" is="panel" >
            <div className="panel-heading" is="panelHead" >
              <span className="panelTitle" >{name}<h4 className="ui blue header" style={{display: 'inline-block'}}>{`总计  ${total}`}</h4></span>
              <div className="pull-right" >
                <NormalButton onClick={this.handleAddRecipe} >新建食谱</NormalButton>
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
        }
        {modal &&
         <Modal isOpen={modal}
           onRequestClose={this.onRequestClose}
           style={customStyles} >
           <div className="ui form">
             <div className="fields">
               <div className="five wide field">
                 <h5>食谱</h5>
               </div>
             </div>
             <div className="fields">
               <FormInput size={5} name="type" value={recipe.type} lable="类型" onChange={this.changeRecipe} options={recipeOptions} />
             </div>
          {recipe.detail && recipe.detail.map((item, index) => {
            return (
              <div className="fields">
                <FormInput size={12} name="detail" value={item} label="食谱" onChange={this.changeDetail.bind(this, index)} />
                <div className="three wide field">
                  <NormalButton className="ui button" onClick={this.deleteItem.bind(this, index)}>删除</NormalButton>
                </div>
              </div>
            );
          })}
          <div className="fields">
            <div className="three wide field">
              <NormalButton className="ui button" onClick={this.addMore} >添加更多</NormalButton>
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <NormalButton className="ui button" onClick={this.handleCancel} >返回</NormalButton>
            </div>
            <div className="field">
              <NormalButton className="ui primary button" onClick={this.handleSave} >保存</NormalButton>
            </div>
          </div>
        </div>
         </Modal>
        }
      </Loader>
    );
  }
}
