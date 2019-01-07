/**
 * Created by isaac on 16/6/12.
 */
import React, {PropTypes} from 'react';
import {disableEvent} from 'utils/ui';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Content} from 'components';
import ReactDOM from 'react-dom';
import {getPatientGrow} from 'redux/modules/patient';

let G2 = null;
if (__CLIENT__) {
  G2 = require('g2');
}

@connect(
  (state) => ({loading: state.cloth.loading}),
  {
    getPatientGrow,
    pushState: push
  })
export default
class Dashboard extends Content {
  static propTypes = {
    getPatientGrow: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  _parseData = (data) => {
    const total = [];
    let sum = 0;
    data.forEach((item) => {
      const {value} = item;
      sum += value;
      total.push({month: item._id, value, type: '增量'});
      total.push({month: item._id, value: sum, type: '总数'});
    });
    return total;
  };
  componentDidMount() {
    if (__CLIENT__) {
      this.props.getPatientGrow(({data}) => {
        console.log(data);
        const container = ReactDOM.findDOMNode(this.refs.patientChart);
        this.chart = new G2.Chart({
          container,
          width: 1000,
          height: 500,
        });
        this.chart.source(this._parseData(data), {
          month: {
            alias: '月份'
          },
          type: {
            alias: '类型'
          },
          value: {
            alias: '数目'
          }
        });
        this.chart.line().position('month*value').color('type');
        this.chart.render();
      });
    }
  }

  render() {
    const name = 'Dashboard';
    return (
      <div is="content" onContextMenu={disableEvent} >
        <div className="panel panel-default" is="panel" >
          <div className="panel-heading" is="panelHead" >
            <span is="panelTitle" >{name}</span>
          </div>
          <div className="panel-body" is="panelbody" >
            <div className="ui grid" >
              <div className="eight wide column" >
                <div ref="patientChart" style={{width: '100%', height: '100%'}} ></div>
              </div>
              <div className="eight wide column" >
              </div>
              <div className="eight wide column" >
              </div>
              <div className="eight wide column" >
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
