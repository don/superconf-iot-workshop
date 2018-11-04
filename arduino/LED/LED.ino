// Hackaday WiFi IoT Workshop
// Control a LED from MQTT
//
// Uses WiFiNINA https://www.arduino.cc/en/Reference/WiFiNINA
// and Joël Gähwiler's MQTT Library https://github.com/256dpi/arduino-mqtt
//

#include <SPI.h>
#include <WiFiNINA.h>
#include <MQTT.h>

WiFiSSLClient net;
MQTTClient mqtt;

const char wifi_ssid[] = "workshop";
const char wifi_password[] = "wifi-password";

const char server[] = "mqtt.iotwork.shop";
const char clientId[] = "deviceX";
const char username[] = "deviceX";
const char password[] = "superconf18!";

String ledTopic = String("workshop/") + clientId + String("/led");

int status = WL_IDLE_STATUS;

void setup() {
  Serial.begin(9600);

  // Uncomment next line to wait for a serial connection
  // while (!Serial) { }
 
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.println("Connecting WiFi");
  connectWiFi();

  // Start the MQTT connection
  Serial.println("Setting up MQTT");
  mqtt.begin(server, 8883, net);

  // define function for incoming messages
  mqtt.onMessage(messageReceived);
}

void loop() {
  mqtt.loop();

  if (!mqtt.connected()) {
    connectMQTT();
  }
}

void connectWiFi() {
  // Check for the WiFi module
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  // Make sure the firmware is new enough
  String fv = WiFi.firmwareVersion();
  if (fv != "1.1.0") {
    Serial.println("Please upgrade the WiFi firmware to 1.1.0");
    // See http://forum.arduino.cc/index.php?topic=572378.0
  }
  
  // attempt to connect to WiFi network
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(wifi_ssid);
    status = WiFi.begin(wifi_ssid, wifi_password);

    // wait 3 seconds for connection
    delay(3000);
  }
  Serial.println("Connected to WiFi");
  printWiFiStatus();

}

void connectMQTT() {
  Serial.print("Connecting MQTT...");
  while (!mqtt.connect(clientId, username, password)) {
    Serial.print(".");
    delay(500);
  }

  mqtt.subscribe(ledTopic);

  Serial.println("connected.");
}

void messageReceived(String &topic, String &payload) {
  Serial.println("incoming: " + topic + " - " + payload);
  if (payload == "ON") {
    // turn the LED on
    digitalWrite(LED_BUILTIN, HIGH);
  } else if (payload == "OFF") {
    // turn the LED off
    digitalWrite(LED_BUILTIN, LOW);    
  }
}

void printWiFiStatus() {
  // print your WiFi IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}
