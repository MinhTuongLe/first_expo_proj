import React, { Component } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator
} from 'react-native';
import Reservation from './reservation';
import PropTypes from 'prop-types';
import XDate from 'xdate';

import dateutils from '../../dateutils';
import styleConstructor from './style';

import { DEVICE } from '../../../../config';

class ReactComp extends Component {
  static propTypes = {
    // specify your item comparison function for increased performance
    rowHasChanged: PropTypes.func,
    // specify how each item should be rendered in agenda
    renderItem: PropTypes.func,
    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
    renderDay: PropTypes.func,
    // specify how empty date content with no items should be rendered
    renderEmptyDate: PropTypes.func,
    // specify header content
    renderHeaderContent: PropTypes.func,
    // specify footer content
    renderFooterContent: PropTypes.func,
    // callback that gets called when day changes while scrolling agenda list
    onDayChange: PropTypes.func,
    // onScroll ListView event
    onScroll: PropTypes.func,
    // the list of items that have to be displayed in agenda. If you want to render item as empty date
    // the value of date key kas to be an empty array []. If there exists no value for date key it is
    // considered that the date in question is not yet loaded
    reservations: PropTypes.object,

    selectedDay: PropTypes.instanceOf(XDate),
    topDay: PropTypes.instanceOf(XDate),
    refreshControl: PropTypes.element,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.styles = styleConstructor(props.theme);
    this.state = {
      reservations: []
    };
    this.heights = [];
    this.selectedDay = this.props.selectedDay;
    this.scrollOver = true;
  }

  UNSAFE_componentWillMount() {
    this.updateDataSource(this.getReservations(this.props).reservations);
  }

  updateDataSource(reservations) {
    this.setState({
      reservations
    });
  }

  updateReservations(props) {
    const reservations = this.getReservations(props);
    if (this.list && !dateutils.sameDate(props.selectedDay, this.selectedDay)) {
      let scrollPosition = 0;
      for (let i = 0; i < reservations.scrollPosition; i++) {
        scrollPosition += this.heights[i] || 0;
      }
      this.scrollOver = false;
      this.list.scrollToOffset({ offset: scrollPosition, animated: true });
    }
    this.selectedDay = props.selectedDay;
    this.updateDataSource(reservations.reservations);
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (!dateutils.sameDate(props.topDay, this.props.topDay)) {
      this.setState({
        reservations: []
      }, () => {
        this.updateReservations(props);
      });
    } else {
      this.updateReservations(props);
    }
  }

  onScroll(event) {
    const yOffset = event.nativeEvent.contentOffset.y;
    this.props.onScroll(yOffset);
    let topRowOffset = 0;
    let topRow;
    for (topRow = 0; topRow < this.heights.length; topRow++) {
      if (topRowOffset + this.heights[topRow] / 2 >= yOffset) {
        break;
      }
      topRowOffset += this.heights[topRow];
    }
    const row = this.state.reservations[topRow];
    if (!row) return;
    const day = row.day;
    const sameDate = dateutils.sameDate(day, this.selectedDay);
    if (!sameDate && this.scrollOver) {
      this.selectedDay = day.clone();
      this.props.onDayChange(day.clone());
    }
  }

  onRowLayoutChange(ind, event) {
    this.heights[ind] = event.nativeEvent.layout.height;
  }

  renderRow({ item, index }) {
    return (
      <View onLayout={this.onRowLayoutChange.bind(this, index)}>
        <Reservation
          item={item}
          renderItem={this.props.renderItem}
          renderDay={this.props.renderDay}
          renderEmptyDate={this.props.renderEmptyDate}
          renderHeaderContent={this.props.renderHeaderContent}
          renderFooterContent={this.props.renderFooterContent}
          theme={this.props.theme}
          rowHasChanged={this.props.rowHasChanged}
        />
      </View>
    );
  }

  getReservationsForDay(iterator, props) {
    const day = iterator.clone();
    const res = props.reservations[day.toString('yyyy-MM-dd')];
    if (res && res.length) {
      return res.map((reservation, i) => {
        return {
          reservation,
          date: i ? false : day,
          day
        };
      });
    } else if (res) {
      return [{
        date: iterator.clone(),
        day
      }];
    } else {
      return false;
    }
  }

  onListTouch() {
    this.scrollOver = true;
  }

  getReservations(props) {
    if (!props.reservations || !props.selectedDay) {
      return { reservations: [], scrollPosition: 0 };
    }
    let reservations = [];
    if (this.state.reservations && this.state.reservations.length) {
      const iterator = this.state.reservations[0].day.clone();
      while (iterator.getTime() < props.selectedDay.getTime()) {
        const res = this.getReservationsForDay(iterator, props);
        if (!res) {
          reservations = [];
          break;
        } else {
          reservations = reservations.concat(res);
        }
        iterator.addDays(1);
      }
    }
    const scrollPosition = reservations.length;
    const iterator = props.selectedDay.clone();
    for (let i = 0; i < 31; i++) {
      const res = this.getReservationsForDay(iterator, props);
      if (res) {
        reservations = reservations.concat(res);
      }
      iterator.addDays(1);
    }

    return { reservations, scrollPosition };
  }

  render() {
    if (!this.props.reservations || !this.props.reservations[this.props.selectedDay.toString('yyyy-MM-dd')]) {
      if (this.props.renderEmptyData) {
        return this.props.renderEmptyData();
      }
      return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>;
    }
    return (
      <FlatList
        ref={(c) => this.list = c}
        style={[this.props.style, { marginTop: 2 }]}
        contentContainerStyle={[this.styles.content, DEVICE.gStyle.grow]}
        renderItem={this.renderRow.bind(this)}
        data={this.state.reservations}
        onScroll={this.onScroll.bind(this)}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={200}
        onMoveShouldSetResponderCapture={() => { this.onListTouch(); return false; }}
        keyExtractor={(item, index) => String(index)}
        refreshControl={this.props.refreshControl}
        refreshing={this.props.refreshing || false}
        onRefresh={this.props.onRefresh}
        extraData={this.state.reservations}
        ListHeaderComponent={this.props.renderHeaderContent}
        ListFooterComponent={this.props.renderFooterContent}
        stickyHeaderIndices={this.props.renderHeaderContent ? [0] : null}
      />
    );
  }
}

export default ReactComp;
