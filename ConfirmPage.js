import { StyleSheet, Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';

const host = 'http://192.168.1.104:3000';

export default function ConfirmPage({ code, setCode }) {
  const [points, setPoints] = useState(0);
  const [customer, setCustomer] = useState({name: '', code: '', points: 0});

  useEffect(() => {
    fetch(`${host}/customer/${code}`)
      .then(response => response.json())
      .then(data => setCustomer(data));
  }, []);
  
  const addPointsPressHandle = () => {
    fetch(`${host}/customer/${code}/add-points`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ points })
    })
      .then(response => response.json())
      .then(data => setCustomer(data));
  };

  const subPointsPressHandle = () => {
    fetch(`${host}/customer/${code}/add-points`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ points: -points })
    })
      .then(response => response.json())
      .then(data => setCustomer(data));
  };

  return (
    <View style={styles.container}>
      <Text>Код: {customer.code}</Text>
      <Text>Ім'я: {customer.name}</Text>
      <Text>Бали: {customer.points}</Text>
      <Text>------------------------------------------------------------</Text>
      <Text>Додати балів: {points}</Text>
      <View style={styles.buttonContainer}>
        <Button title='Додати бал' onPress={() => setPoints(points + 1)} />
        <Button title='Відняти бал' onPress={() => {
          if (points > 0)
            setPoints(points - 1);
        }} />
        <Text>------------------------------------------------------------</Text>
        <Button style={{backgroundColor: 'green'}} title='Зарахувати' onPress={addPointsPressHandle} />
        <Button style={{backgroundColor: 'red'}} title='Списати' onPress={subPointsPressHandle} />
        <Text>------------------------------------------------------------</Text>
        <Button title='Сканувати ще раз' onPress={() => setCode('')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});