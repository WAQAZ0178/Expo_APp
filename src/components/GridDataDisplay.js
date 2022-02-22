import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const GridDataDisplay = ({
  headerText,
  rightLink,
  centralText,
  treatmentDelayText,
  availabilityText,
  costText,
  navigation
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.headerText}>{headerText}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Information', {
              id: rightLink
            })
          }
        >
          <Text style={styles.moreLink}>More</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.centralText}>{centralText}</Text>

      <View style={styles.bottomRow}>
        <View style={styles.bottomEntry}>
          <Text style={styles.labelText}>Treatment Delay</Text>
          <Text style={styles.treatmentDelayText}>{treatmentDelayText}</Text>
        </View>

        <View style={styles.bottomEntry}>
          <Text style={styles.labelText}>Available</Text>
          <Text style={styles.availabilityText}>{availabilityText}</Text>
        </View>

        <View style={styles.bottomEntry}>
          <Text style={styles.labelText}>Cost</Text>
          <Text style={styles.costText}>{costText}</Text>
        </View>
      </View>
    </View>
  )
}

GridDataDisplay.propTypes = {
  headerText: PropTypes.string,
  rightLink: PropTypes.string,
  centralText: PropTypes.string,
  treatmentDelayText: PropTypes.string,
  availabilityText: PropTypes.string,
  costText: PropTypes.string,
  navigation: PropTypes.object.isRequired
}

// TODO: default values
GridDataDisplay.defaultProps = {
  headerText: '',
  rightLink: '',
  centralText: '',
  treatmentDelayText: '',
  availabilityText: '',
  costText: ''
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#434470',
    marginLeft: 15,
    marginTop: 15,
    borderRadius: 10
  },
  bottomRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingLeft: 10
  },
  bottomEntry: {
    flex: 1,
    flexDirection: 'column'
  },
  topHeader: {
    marginLeft: 15,
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    color: '#FCD06A',
    fontSize: 17,
    flex: 2,
    textAlign: 'center',
    alignItems: 'center'
  },
  moreLink: {
    color: '#FFFFFF',
    backgroundColor: '#83296B',
    marginRight: 10,
    justifyContent: 'flex-end',
    borderRadius: 10
  },
  labelText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 7
  },
  centralText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 15
  },
  treatmentDelayText: {
    color: '#FCD06A',
    textAlign: 'center',
    fontSize: 10
  },
  availabilityText: {
    color: '#FCD06A',
    textAlign: 'center',
    fontSize: 10
  },
  costText: {
    color: '#FCD06A',
    fontSize: 10,
    textAlign: 'center'
  }
})

export default GridDataDisplay
