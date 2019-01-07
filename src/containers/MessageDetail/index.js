/**
 * Created by isaac on 16/5/30.
 */
import React, {Component, PropTypes} from 'react';
import {disableEvent, alertSuccess, alertError} from 'utils/ui';
import {isEmpty} from 'utils/validation';
import {Avatar, VerticalInput} from 'components';
import {connect} from 'react-redux';
import * as actions from 'redux/modules/message';
import {goBack} from 'react-router-redux';

@connect(
  () => ({}),
  {
    goBack,
    ...actions,
  }
)
export default
class MessageDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    createMessage: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
    getMessage: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    const {params: {messageID}} = this.props;
    if (messageID) {
      this.props.getMessage(messageID, (response) => {
        const {data} = response;
        data.id = data._id;
        delete data._id;
        this.setState(data);
      });
    }
  }
  _toggleValue = (event) => {
    const {name} = event.target;
    const value = this.state[name];
    const update = {};
    update[name] = !value;
    this.setState(update);
  };
  _onChange = (event) => {
    const {name, value} = event.target;
    const update = {};
    update[name] = value;
    this.setState(update);
  };
  _handleCancel = (event) => {
    event.preventDefault();
    this.props.goBack();
  };
  _handleSave = (event) => {
    event.preventDefault();
    const {id, ...rest} = this.state;
    const {category, title, thumbnail, description, url} = rest;
    if (isEmpty(category) || isEmpty(title) || isEmpty(thumbnail) || isEmpty(description) || isEmpty(url)) {
      alertError('请检查输入');
    } else {
      if (id) {
        // update message
        this.props.updateMessage({id, args: rest}, (response) => {
          console.log(response);
          alertSuccess('更新成功!');
        });
      } else {
        this.props.createMessage(rest, (response) => {
          console.log(response);
          alertSuccess('创建成功!');
        });
      }
    }
  };

  render() {
    const name = '信息详情';
    const style = {
      height: '40px',
      marginTop: '5px'
    };
    const {category, title, thumbnail, description, url, summary} = this.state;
    return (
      <div className="uhs-content" onContextMenu={disableEvent} >
        <div className="panel panel-default" >
          <div className="panel-heading" style={style} >
            <span className="panelTitle" >{name}</span>
          </div>
          <div className="panel-body" >
            <div className="ui grid" >
              <div className="eight wide column" style={{borderRight: '1px solid rgba(230, 230, 230, 1)'}} >
                <form className="ui form" >
                  <div className="fields" >
                    <VerticalInput label="分类" name="category" value={category || ''} onChange={this._onChange} />
                    <div className="field" >
                      <div className="ui toggle checkbox">
                        <input type="checkbox" name="is_top" checked={this.state.is_top || false} onChange={this._toggleValue} />
                        <label>置顶</label>
                      </div>
                    </div>
                    <div className="field" >
                      <div className="ui toggle checkbox">
                        <input type="checkbox" name="is_lesson" checked={this.state.is_lesson || false} onChange={this._toggleValue} />
                        <label>展示在"小球讲堂"中?</label>
                      </div>
                    </div>
                    <div className="field" >
                      <div className="ui toggle checkbox">
                        <input type="checkbox" name="recommend_recipe" checked={this.state.recommend_recipe || false} onChange={this._toggleValue} />
                        <label>推荐食谱</label>
                      </div>
                    </div>
                  </div>
                  <VerticalInput label="标题" name="title" value={title || ''} onChange={this._onChange} />
                  <VerticalInput label="缩略图URL" name="thumbnail" value={thumbnail || ''} onChange={this._onChange} />
                  <VerticalInput label="URL" name="url" value={url || ''} onChange={this._onChange} />
                  <div className="field" >
                    <label>描述</label>
                    <textarea name="description" onChange={this._onChange} value={description || ''} ></textarea>
                  </div>
                  <div className="field" >
                    <label>摘要</label>
                    <textarea name="summary" onChange={this._onChange} value={summary || ''} ></textarea>
                  </div>
                  <div className="fields">
                    <div className="field">
                      <button className="ui button" onClick={this._handleCancel} >返回</button>
                    </div>
                    <div className="field">
                      <button className="ui primary button" onClick={this._handleSave} >保存</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="eight wide column" >
                <form className="ui form" >
                  <div className="field" >
                    <label>缩略图预览</label>
                    <Avatar style={{height: '100px'}} src={thumbnail} />
                  </div>
                  <div className="field" >
                    <label>文章预览</label>
                    <iframe src={url} height="500px" width="100%" ></iframe>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}
