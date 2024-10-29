/**
 * @Description: Height & Weight Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import {
  View,
  Text,
  Modal,
  processColor,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-fontawesome-pro';
import moment from 'moment';
/** COMMON */
import {DEVICE, COLOR, LANG, CONFIG} from '../../../../config';
import Helpers from '../../../../helpers';
/** COMPONENT */
import CText from '../../../../components/CText';
import CLoading from '../../../../components/CLoading';
import wGirl from '../../../../config/ChildGrowthStandards/weight/girl';
import wBoy from '../../../../config/ChildGrowthStandards/weight/boy';
import hGirl from '../../../../config/ChildGrowthStandards/height/girl';
import hBoy from '../../../../config/ChildGrowthStandards/height/boy';
/** STYLES */
import styles from './style';
import {getMonthsDifference} from '../../../../utils/dateTime';

const INIT = {
  TXT_H_W_TITLE: 'txtWH',
  TXT_MONTH: 'monthAge',
  TXT_HEIGHT: 'txtHeight',
  TXT_WEIGHT: 'txtWeight',
};

class ViewHeightWeight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadForChart: true,
      showSortAge: false,
      xAxis: {
        valueFormatter: [
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
        ],
        position: 'BOTTOM',
        gridColor: processColor(COLOR.placeholderTextColor),
        fontSize: Helpers.fS(12),
        axisLineColor: processColor(COLOR.placeholderTextColor),
        axisLineWidth: 0,
        granularityEnabled: true,
        granularity: 1,
        gridLineWidth: 0,
      },
      yHeightAxis: {
        right: {
          valueFormatter: '#.#',
          axisLineWidth: 0.5,
          granularityEnabled: true,
          granularity: 1,
          drawLabels: true,
          gridLineWidth: 0.5,
          gridDashedLine: {
            lineLength: 2,
            spaceLength: 2,
          },
        },
        left: {
          valueFormatter: '#.#',
          axisLineWidth: 0.5,
          granularityEnabled: true,
          granularity: 1,
          drawLabels: true,
          gridLineWidth: 0.5,
          gridDashedLine: {
            lineLength: 2,
            spaceLength: 2,
          },
        },
      },
      yWeightAxis: {
        right: {
          valueFormatter: '#.#',
          axisLineWidth: 0.5,
          granularityEnabled: true,
          granularity: 1,
          drawLabels: true,
          gridLineWidth: 0.5,
          gridDashedLine: {
            lineLength: 2,
            spaceLength: 2,
          },
        },
        left: {
          valueFormatter: '#.#',
          axisLineWidth: 0.5,
          granularityEnabled: true,
          granularity: 1,
          drawLabels: true,
          gridLineWidth: 0.5,
          gridDashedLine: {
            lineLength: 2,
            spaceLength: 2,
          },
        },
      },
      config_plus1SD: {
        color: processColor(COLOR.chartPlus1SD),
        circleColor: processColor(COLOR.chartPlus1SD),
        fillColor: processColor(COLOR.chartPlus1SD),
        drawCircles: true,
        dashedLine: {
          lineLength: Platform.OS === 'ios' ? 8 : 20,
          spaceLength: Platform.OS === 'ios' ? 3 : 10,
        },
        drawValues: false,
        lineWidth: 1.5,
        circleRadius: 2,
        drawFilled: true,
      },
      config_standard: {
        color: processColor(COLOR.chartStandard),
        circleColor: processColor(COLOR.chartStandard),
        fillColor: processColor(COLOR.chartStandard),
        drawCircles: true,
        dashedLine: {
          lineLength: Platform.OS === 'ios' ? 8 : 20,
          spaceLength: Platform.OS === 'ios' ? 3 : 10,
        },
        drawValues: false,
        lineWidth: 1.5,
        circleRadius: 2,
        drawFilled: true,
      },
      config_minus1SD: {
        color: processColor(COLOR.chartMinus1SD),
        circleColor: processColor(COLOR.chartMinus1SD),
        fillColor: processColor(COLOR.chartMinus1SD),
        drawCircles: true,
        dashedLine: {
          lineLength: Platform.OS === 'ios' ? 8 : 20,
          spaceLength: Platform.OS === 'ios' ? 3 : 10,
        },
        drawValues: false,
        lineWidth: 1.5,
        circleRadius: 2,
        drawFilled: true,
      },
      config_minus2SD: {
        color: processColor(COLOR.chartMinus2SD),
        circleColor: processColor(COLOR.chartMinus2SD),
        fillColor: processColor(COLOR.chartMinus2SD),
        drawCircles: true,
        dashedLine: {
          lineLength: Platform.OS === 'ios' ? 8 : 20,
          spaceLength: Platform.OS === 'ios' ? 3 : 10,
        },
        drawValues: false,
        lineWidth: 1.5,
        circleRadius: 2,
        drawFilled: true,
      },
      config_kid: {
        // mode: 'CUBIC_BEZIER',
        valueFormatter: '#.#',
        valueTextColor: processColor(COLOR.primaryApp),
        valueTextSize: Helpers.fS(12),
        circleColor: processColor(COLOR.primaryApp),
        highlightColor: processColor(COLOR.primaryApp),
        color: processColor(COLOR.primaryApp),
        fillColor: processColor(COLOR.primaryApp),
        fillAlpha: 10,
        circleRadius: 5,
        lineWidth: 2,
        highlightEnabled: true,
        drawCubic: true,
        drawValues: false,
        drawFilled: true,
        fillGradient: {
          colors: [
            processColor(COLOR.primaryApp),
            processColor(COLOR.primaryApp),
          ],
          positions: [0, 0.5],
          angle: 50,
          orientation: 'TOP_BOTTOM',
        },
      },
      legend: {
        enabled: true,
        textColor: processColor(COLOR.text_1),
        textSize: Helpers.fS(12),
        position: 'LEFT_OF_CHART_CENTER',
        form: 'SQUARE',
        formSize: Helpers.fS(16),
        xEntrySpace: 10,
        yEntrySpace: 10,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 1,
      },
      dataH: {
        dataSets: [
          {label: LANG[CONFIG.lang].plus1SDH, values: []},
          {label: LANG[CONFIG.lang].standard, values: []},
          {label: LANG[CONFIG.lang].minus1SDH, values: []},
          {label: LANG[CONFIG.lang].minus2SDH, values: []},
          {label: LANG[CONFIG.lang].reality, values: []},
        ],
      },
      dataW: {
        dataSets: [
          {label: LANG[CONFIG.lang].plus1SDW, values: []},
          {label: LANG[CONFIG.lang].standard, values: []},
          {label: LANG[CONFIG.lang].minus1SDW, values: []},
          {label: LANG[CONFIG.lang].minus2SDW, values: []},
          {label: LANG[CONFIG.lang].reality, values: []},
        ],
      },
      marker: {
        enabled: true,
        digits: 1,
        markerColor: processColor(COLOR.primaryButton),
        textColor: processColor('#ffffff'),
        config: {
          drawValues: true,
          drawCircles: true,
          lineWidth: 1,
          mode: 'CUBIC_BEZIER',
          drawCubicIntensity: 0.2,
          circleRadius: 4,
          color: processColor('gray'),
          drawFilled: true,
          fillColor: processColor('gray'),
          fillAlpha: 45,
          circleColor: processColor('gray'),
          circleHoleColor: processColor('gray'),
          valueFormatter: '#.#',
        },
      },
      ageSelected: 1,
      arrAge: [],
      animateBg: new Animated.Value(0),
      heightNow: 0,
      weightNow: 0,
      birthday: null,
      calledOnce: false,
    };
  }

  /** FUNCTION */
  _prepareData = () => {
    let {data} = this.props;
    let {ageSelected} = this.state;
    let arrAge = [];
    for (let i = 1; i <= 4; i += 1) {
      arrAge.push(i);
      if (i === data.idxPickerActive) ageSelected = data.idxPickerActive;
    }

    this.setState(
      {
        arrAge,
        ageSelected,
        heightNow: data?.heightNow,
        weightNow: data?.weightNow,
        birthday: data?.birthday,
      },
      () => this._formatData(),
    );
  };

  _formatData = async () => {
    let {data} = this.props;
    let {
      dataH,
      dataW,
      config_standard,
      config_minus1SD,
      config_minus2SD,
      config_plus1SD,
      config_kid,
      ageSelected,
      xAxis,
    } = this.state;

    let from = ageSelected === 1 ? 12 : ageSelected * 12;
    let to = from + 12;

    /** Height */
    let heightStandard =
      data.gender === 1 ? hBoy.hStandardBoy : hGirl.hStandardGirl;
    let heightPlus1SD =
      data.gender === 1 ? hBoy.hPlus1SDBoy : hGirl.hPlus1SDGirl;
    let heightMinus1SD =
      data.gender === 1 ? hBoy.hMinus1SDBoy : hGirl.hMinus1SDGirl;
    let heightMinus2SD =
      data.gender === 1 ? hBoy.hMinus2SDBoy : hGirl.hMinus2SDGirl;

    /** Width */
    let weightStandard =
      data.gender === 1 ? wBoy.wStandardBoy : wGirl.wStandardGirl;
    let weightPlus1SD =
      data.gender === 1 ? wBoy.wPlus1SDBoy : wGirl.wPlus1SDGirl;
    let weightMinus1SD =
      data.gender === 1 ? wBoy.wMinus1SDBoy : wGirl.wMinus1SDGirl;
    let weightMinus2SD =
      data.gender === 1 ? wBoy.wMinus2SDBoy : wGirl.wMinus2SDGirl;

    let tmpFrom = from;
    let valueFormatter = [];
    for (from; from <= to; from++) {
      // Add to array to render xAxis range
      valueFormatter.push(from.toString());
      /** Height */
      dataH.dataSets[0].values.push({y: heightPlus1SD[from].y});
      dataH.dataSets[1].values.push({y: heightStandard[from].y});
      dataH.dataSets[2].values.push({y: heightMinus1SD[from].y});
      dataH.dataSets[3].values.push({y: heightMinus2SD[from].y});

      /** Width */
      dataW.dataSets[0].values.push({y: weightPlus1SD[from].y});
      dataW.dataSets[1].values.push({y: weightStandard[from].y});
      dataW.dataSets[2].values.push({y: weightMinus1SD[from].y});
      dataW.dataSets[3].values.push({y: weightMinus2SD[from].y});

      let arrFilter = data.h_w.filter(
        f =>
          moment(f.date, 'YYYY-MM-DD').diff(
            moment(data.birthday, 'YYYY-MM-DD'),
            'months',
          ) === from,
      );
      if (arrFilter.length > 0) {
        let tmpHeightMax = Math.max.apply(
          Math,
          arrFilter.map(function (o) {
            return o.height;
          }),
        );

        let tmpWeightMax = Math.max.apply(
          Math,
          arrFilter.map(function (o) {
            return o.weight;
          }),
        );

        let height = tmpHeightMax.toFixed(2);
        let weight = tmpWeightMax.toFixed(2);

        dataH.dataSets[4].values.push({
          x: from - tmpFrom,
          y: Number(height),
        });

        dataW.dataSets[4].values.push({
          x: from - tmpFrom,
          y: Number(weight),
        });
      }
    }

    dataH.dataSets[0].config = config_plus1SD;
    dataH.dataSets[1].config = config_standard;
    dataH.dataSets[2].config = config_minus1SD;
    dataH.dataSets[3].config = config_minus2SD;
    dataH.dataSets[4].config = config_kid;

    dataW.dataSets[0].config = config_plus1SD;
    dataW.dataSets[1].config = config_standard;
    dataW.dataSets[2].config = config_minus1SD;
    dataW.dataSets[3].config = config_minus2SD;
    dataW.dataSets[4].config = config_kid;

    this.setState({
      xAxis: {
        ...xAxis,
        valueFormatter,
      },
      dataH,
      dataW,
      loadForChart: false,
      loading: false,
    });
  };

  _sortAge = () => {
    if (this.state.showSortAge) {
      Helpers.animTiming(this.state.animateBg, 0, 200, true);
      setTimeout(() => {
        this.setState({
          showSortAge: !this.state.showSortAge,
        });
      }, 200);
    } else {
      Helpers.animTiming(this.state.animateBg, 1, 300, true);
      this.setState({
        showSortAge: !this.state.showSortAge,
      });
    }
  };

  /** HANDLE FUNCTIONS */
  _onSelectedValue = value => {
    let {dataH, dataW, xAxis, yHeightAxis, yWeightAxis} = this.state;
    let tmp = value * 12,
      arrMonth = [];

    for (let i = 0; i <= 12; i++) {
      arrMonth.push((tmp + i).toString());
    }
    xAxis = {
      valueFormatter: arrMonth,
      position: 'BOTTOM',
      gridColor: processColor(COLOR.placeholderTextColor),
      fontSize: Helpers.fS(12),
      axisLineColor: processColor(COLOR.placeholderTextColor),
      axisLineWidth: 0,
      granularityEnabled: true,
      granularity: 1,
      gridLineWidth: 0,
    };
    yHeightAxis = {
      right: {
        valueFormatter: '#.#',
        axisLineWidth: 0.5,
        granularityEnabled: true,
        granularity: 1,
        drawLabels: true,
        gridLineWidth: 0.5,
        gridDashedLine: {
          lineLength: 2,
          spaceLength: 2,
        },
      },
      left: {
        valueFormatter: '#.#',
        axisLineWidth: 0.5,
        granularityEnabled: true,
        granularity: 1,
        drawLabels: true,
        gridLineWidth: 0.5,
        gridDashedLine: {
          lineLength: 2,
          spaceLength: 2,
        },
      },
    };
    yWeightAxis = {
      right: {
        valueFormatter: '#.#',
        axisLineWidth: 0.5,
        granularityEnabled: true,
        granularity: 1,
        drawLabels: true,
        gridLineWidth: 0.5,
        gridDashedLine: {
          lineLength: 2,
          spaceLength: 2,
        },
      },
      left: {
        valueFormatter: '#.#',
        axisLineWidth: 0.5,
        granularityEnabled: true,
        granularity: 1,
        drawLabels: true,
        gridLineWidth: 0.5,
        gridDashedLine: {
          lineLength: 2,
          spaceLength: 2,
        },
      },
    };
    dataH = {
      dataSets: [
        {label: LANG[CONFIG.lang].plus1SDH, values: []},
        {label: LANG[CONFIG.lang].standard, values: []},
        {label: LANG[CONFIG.lang].minus1SDH, values: []},
        {label: LANG[CONFIG.lang].minus2SDH, values: []},
        {label: LANG[CONFIG.lang].reality, values: []},
      ],
    };
    dataW = {
      dataSets: [
        {label: LANG[CONFIG.lang].plus1SDW, values: []},
        {label: LANG[CONFIG.lang].standard, values: []},
        {label: LANG[CONFIG.lang].minus1SDW, values: []},
        {label: LANG[CONFIG.lang].minus2SDW, values: []},
        {label: LANG[CONFIG.lang].reality, values: []},
      ],
    };

    this.setState(
      {
        loadForChart: true,
        ageSelected: value,
        dataH,
        dataW,
        xAxis,
        yHeightAxis,
        yWeightAxis,
      },
      () => this._formatData(),
    );
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._prepareData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ageSelected !== this.state.prevState) {
      if (prevProps.data !== this.props.data) {
        this._onSelectedValue(prevState.ageSelected);
      }
    }
  }

  /** OTHER RENDER */
  _renderEmpty = () => {
    return (
      <View
        style={[
          {height: Helpers.hS('15%'), borderRadius: 10},
          DEVICE.gStyle.center,
        ]}>
        <Icon
          containerStyle={{marginTop: 10}}
          name={'exclamation-circle'}
          size={DEVICE.s * 50}
          color={COLOR.placeholderTextColor}
          type={'solid'}
        />
        <Text style={styles.con_empty}>{LANG[CONFIG.lang].txtEmptyOfDay}</Text>
      </View>
    );
  };

  /** RENDER */
  render() {
    return (
      <View style={[styles.con, {backgroundColor: COLOR.backgroundMain}]}>
        {this.state.loading ? (
          <CLoading />
        ) : (
          <View
            style={{
              backgroundColor: COLOR.backgroundMain,
              marginVertical: 10,
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: COLOR.backgroundSec,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}>
                <CText style={styles.txt_unit}>
                  {this.state?.birthday
                    ? getMonthsDifference(this.state.birthday) + '\u00A0tháng'
                    : ''}
                </CText>
                <View style={styles.con_picker_main}>
                  {Platform.OS === 'android' && (
                    <Picker
                      mode={'dialog'}
                      selectedValue={this.state.ageSelected}
                      style={[
                        styles.txt_item_result,
                        {height: 36, width: Helpers.wS('40%')},
                      ]}
                      itemStyle={[styles.txt_item_result, {borderWidth: 1}]}
                      onValueChange={(itemValue, itemIndex) =>
                        this._onSelectedValue(itemValue)
                      }>
                      {this.state.arrAge.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={`${item} - ${item + 1} ${
                              LANG[CONFIG.lang].years_old
                            }`}
                            value={item}
                          />
                        );
                      })}
                    </Picker>
                  )}
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      style={styles.con_item}
                      onPress={this._sortAge}>
                      <Text style={styles.txt_item_result}>{`${
                        this.state.ageSelected
                      } - ${this.state.ageSelected + 1} ${
                        LANG[CONFIG.lang].years_old
                      }`}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.con_chart}>
                <View
                  style={
                    (DEVICE.gStyle.row_align_center,
                    DEVICE.gStyle.row_space_between)
                  }>
                  <CText
                    style={styles.header_title}
                    i18nKey={INIT.TXT_HEIGHT}
                    upperCase
                  />
                  <View style={styles.con_unit}>
                    <CText style={styles.txt_unit}>
                      {this.state.heightNow}
                    </CText>
                    <CText style={styles.txt_unit}>{' Cm'}</CText>
                  </View>
                </View>

                {!this.state.loadForChart && (
                  <LineChart
                    style={{flex: 1, height: Helpers.wS('90%')}}
                    data={this.state.dataH}
                    marker={this.state.marker}
                    xAxis={this.state.xAxis}
                    yAxis={this.state.yHeightAxis}
                    borderColor={processColor(COLOR.placeholderTextColor)}
                    legend={this.state.legend}
                    chartDescription={{text: ''}}
                    drawBorders={true}
                    drawGridBackground={false}
                    autoScaleMinMaxEnabled={true}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={true}
                    doubleTapToZoomEnabled={false}
                    highlightPerTapEnabled={true}
                    highlightPerDragEnabled={true}
                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}
                    keepPositionOnRotation={false}
                    animation={{
                      durationX: 0,
                      durationY: 1000,
                      easingY: 'Linear',
                    }}
                  />
                )}
              </View>
            </View>

            <View
              style={{
                borderRadius: 10,
                backgroundColor: COLOR.backgroundSec,
                marginTop: 10,
              }}>
              <View style={styles.con_chart}>
                <View
                  style={
                    (DEVICE.gStyle.row_align_center,
                    DEVICE.gStyle.row_space_between)
                  }>
                  <CText
                    style={styles.header_title}
                    i18nKey={INIT.TXT_WEIGHT}
                    upperCase
                  />
                  <View style={styles.con_unit}>
                    <CText style={styles.txt_unit}>
                      {this.state.weightNow}
                    </CText>
                    <CText style={styles.txt_unit}>{' Kg'}</CText>
                  </View>
                </View>

                {!this.state.loadForChart && (
                  <LineChart
                    style={{
                      flex: 1,
                      height: Helpers.wS('90%'),
                    }}
                    marker={this.state.marker}
                    data={this.state.dataW}
                    xAxis={this.state.xAxis}
                    yAxis={this.state.yWeightAxis}
                    borderColor={processColor(COLOR.placeholderTextColor)}
                    legend={this.state.legend}
                    chartDescription={{text: ''}}
                    drawBorders={true}
                    drawGridBackground={false}
                    autoScaleMinMaxEnabled={true}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={true}
                    doubleTapToZoomEnabled={false}
                    highlightPerTapEnabled={true}
                    highlightPerDragEnabled={true}
                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}
                    keepPositionOnRotation={false}
                    animation={{
                      durationX: 0,
                      durationY: 1000,
                      easingY: 'Linear',
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        )}

        {Platform.OS === 'ios' && (
          <Modal
            visible={this.state.showSortAge}
            animationType={'slide'}
            onRequestClose={this._sortAge}
            transparent>
            <View style={styles.con_bg_picker_ios}>
              <View style={styles.con_content_picker_ios}>
                <View style={styles.con_header_picker_ios}>
                  <CText
                    style={styles.txt_header_picker_ios_left}
                    i18nKey={'cancel'}
                    onPress={this._sortAge}
                  />
                  <CText
                    style={styles.txt_header_picker_ios_right}
                    i18nKey={'ok'}
                    onPress={this._sortAge}
                  />
                </View>
                <Picker
                  selectedValue={this.state.ageSelected}
                  style={styles.con_picker_ios}
                  itemStyle={styles.txt_item_picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this._onSelectedValue(itemValue)
                  }>
                  {this.state.arrAge.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index.toString()}
                        label={`${item} - ${item + 1} ${
                          LANG[CONFIG.lang].years_old
                        }`}
                        value={item}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </Modal>
        )}

        {this.state.showSortAge && (
          <Animated.View
            style={[styles.con_bg_grey, {opacity: this.state.animateBg}]}
          />
        )}
      </View>
    );
  }
}

export default ViewHeightWeight;
