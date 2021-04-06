import React, { Component } from "react";
import { Button, Text, TextInput, View, StyleSheet, Image } from "react-native";
import Swiper from "react-native-swiper"; // 1.5.13

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "David",
      latitude: null,
      longitude: null,
      error: null,
      showCoords: false,
      temp: 0,
      unit: "Celsius",
      isF: false,
      town: null,
      weather: null,
      loaded: false,
    };
  }

  changeName = (text) => {
    var name = text;
    this.setState({ name: text });
  };

  onButtonClickHandler = () => {
    this.setState({
      showCoords: true,
    });

    this.getWeather(this.state.latitude, this.state.longitude);
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },

      (error) => this.setState({ error: error.message }),

      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getWeather = (lat, lon) => {
    const API_KEY = "b04b58fd4665466491035614202202";

    fetch(
      "http://api.weatherapi.com/v1/current.json?q=" +
        lat +
        "," +
        lon +
        "&key=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          town: responseJSON.location.name,
          temp: responseJSON.current.temp_f,
          weather: responseJSON.current.condition.text,
          icon: responseJSON.current.condition.icon,
          wind: responseJSON.current.wind_mph,
          wdir: responseJSON.current.wind_dir,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View style={styles.container}>
          <Text style={styles.title}> Home Screen </Text>

          <TextInput
            style={{ alignContent: "center" }}
            placeholder="Enter your name!"
            placeholderTextColor="white"
            onChangeText={this.changeName}
          />

          <Text style={styles.namePlate}> Hi {this.state.name}</Text>
        </View>

        <View style={styles.container}>
          <Button title="ACTIVATE GPS" onPress={this.onButtonClickHandler}>
            {" "}
          </Button>

          {this.state.showCoords ? (
            <Text>LON: {this.state.longitude} </Text>
          ) : null}
          {this.state.showCoords ? (
            <Text>LAT: {this.state.latitude} </Text>
          ) : null}
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

          <Text style={styles.namePlate}> Hi {this.state.name}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Weather Screen</Text>

          <Text style={styles.title}>Temperture: {this.state.temp}</Text>
          <Text style={styles.title}>Town: {this.state.town}</Text>
          <Text style={styles.title}>Weather: {this.state.weather}</Text>

          <Text style={styles.namePlate}> Hi {this.state.name}</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  title: {
    color: "white",
    fontSize: 30,
  },
  otherText: {
    color: "lightgray",
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#001F5B",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: 200,
    height: 200,
  },
  namePlate: {
    padding: 10,
    fontSize: 28,
    position: "absolute",
    bottom: 30,
  },
});
