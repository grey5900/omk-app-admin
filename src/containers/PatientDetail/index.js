/**
 * Created by isaac on 2/24/16.
 */
import React, {PropTypes} from 'react';
import {disableEvent} from 'utils/ui';
import {getPageCount} from 'utils/func';
import {connect} from 'react-redux';
import * as actions from 'redux/modules/patient';
import {push} from 'react-router-redux';
import {Content, SortTableView} from 'components';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';
import {Scrollbars} from 'react-custom-scrollbars';
import Tabs, {TabPane} from 'rc-tabs';
import {weightColumnCreator, clothColumnCreator, parseWeight} from './info';

let G2 = null;
if (__CLIENT__) {
  G2 = require('g2');
}

@connect(
  (state) => ({
    loaded: state.patient.loaded,
    user: state.auth.user
  }),
  {
    ...actions,
    pushState: push
  })
export default
class PatientDetail extends Content {
  static propTypes = {
    params: PropTypes.object,
    openAlert: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    getPatientInfo: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      weightTotalPages: 0,
      weightCurrentPage: -1,
      pageSize: 12,
      weights: [],
      weightColumns: weightColumnCreator(),

      clothTotalPages: 0,
      clothCurrentPage: -1,
      clothes: [],
      clothColumns: clothColumnCreator()
    };
  }
  componentDidMount() {
    const {params: {patientID}} = this.props;
    const {pageSize} = this.state;
    this.props.getPatientInfo(patientID, (response) => {
      const {clothes, weights} = response;
      this.setState({
        weightTotalPages: getPageCount(weights.length, pageSize),
        weightCurrentPage: 0,
        weights,
        clothes,
        clothCurrentPage: 0,
        clothTotalPages: getPageCount(clothes.length, pageSize),
      });
    });
  }
  _onTabChange = (key) => {
    if (key === '2') {
      const {params: {patientID}} = this.props;
      this.props.getPatientInfo(patientID, (response) => {
        const {weights} = response;

        let container = ReactDOM.findDOMNode(this.refs.lineChart);
        // this.chart = new G2.Chart({
        //   container,
        //   width: 1000,
        //   height: 500,
        // });
        // this.chart.source(parseCloth(clothes), {
        //   name: {
        //     alias: '种类'
        //   },
        //   value: {
        //     alias: '数目'
        //   }
        // });
        // this.chart.interval().position('name*value').color('name');
        // this.chart.render();

        // render weight
        //
        if (!this.weightChart) {
          container = ReactDOM.findDOMNode(this.refs.weightChart);
          console.log('con:', container);
          this.weightChart = new G2.Chart({
            container,
            width: 1000,
            height: 500
          });
          const defs = {
            time: {
              alias: '时间',
              type: 'time'
            },
            value: {
              alias: '值'
            },
            name: {
              alias: '指标'
            }
          };
          this.data = parseWeight(weights);
          this.weightChart.source(this.data[0], defs);
          this.weightChart.line().position('time*value').color('name').size(2);
          this.weightChart.render();
          console.log('did render:', weights);
        }
        // render heart
        // container = ReactDOM.findDOMNode(this.refs.heartChart);
        // const heartChart = new G2.Chart({
        //   container,
        //   width: 1000,
        //   height: 500
        // });
        // defs = {
        //   time: {
        //     alias: '时间',
        //     type: 'time'
        //   },
        //   value: {
        //     type: 'linear',
        //     min: 30,
        //     max: 200,
        //     alias: '值'
        //   },
        //   name: {
        //     alias: '指标'
        //   }
        // };
        // heartChart.source(this.data[1], defs);
        // heartChart.line().position('time*value').color('name').size(2);
        // heartChart.render();
      });
    }
  };

  _handleExport = () => {
    console.log('export!!!');
  };
  weightGotoPage = (index) => {
    console.log(index);
  };
  clothGotoPage = (index) => {
    console.log(index);
    // const {pageSize, activeType} = this.state;
    // this.props.listCloths({skip: index * pageSize, limit: pageSize, type: activeType.data._id}, (response) => {
    //   if (response) {
    //     const {data, total} = response.data;
    //     this.setState({
    //       currentPage: index,
    //       total,
    //       cloths: data
    //     });
    //   }
    // });
  }

  render() {
    const name = '患者信息';
    const style = {
      height: '40px',
      marginTop: '5px'
    };
    const {weightTotalPages, weightCurrentPage, pageSize, weights, weightColumns} = this.state;
    // const {clothTotalPages, clothCurrentPage, clothes, clothColumns} = this.state;
    console.log(weights, weightColumns, 'render clothes.....');
    return (
      <div className="uhs-content" onContextMenu={disableEvent} >
        <Helmet title={name} />
        <div className="panel panel-default" >
          <div className="panel-heading" style={style} >
            <span className="panelTitle" >{name}</span>
            <div className="toolbarRight" >
              {/* <NormalButton onClick={this._handleExport} >导出统计结果</NormalButton> */}
            </div>
          </div>
          <div className="panel-body" >
            <Tabs defaultActiveKey="1" className="full-height" onChange={this._onTabChange}>
              <TabPane tab="体重" key="1" >
                <SortTableView gotoPage={this.weightGotoPage}
                               pageCount={weightTotalPages}
                               currentPage={weightCurrentPage}
                               pageSize={pageSize}
                               rows={weights}
                               columns={weightColumns} />
              </TabPane>
              <TabPane tab="统计" key="2" >
                <Scrollbars>
                  <div className="ui grid" >
                    <div className="sixteen wide column" >
                      <div ref="lineChart" style={{width: '100%', height: '100%'}} ></div>
                    </div>
                    <div className="sixteen wide column" >
                      <div ref="weightChart" style={{width: '100%', height: '100%'}} ></div>
                    </div>
                    <div className="sixteen wide column" >
                      <div ref="heartChart" style={{width: '100%', height: '100%'}} ></div>
                    </div>
                  </div>
                </Scrollbars>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
