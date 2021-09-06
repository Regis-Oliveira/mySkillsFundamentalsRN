import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  Platform,
  FlatList,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData{
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }

    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    console.log("currentHour::", currentHour);

    if(currentHour < 12) {
      setGretting('Good Morning');
    } else if(currentHour <= 12 && currentHour < 18) {
      setGretting('Good Afternoon');
    } else {
      setGretting('Good Night');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Régis</Text>

      <Text style={styles.title}>
        {gretting} 
      </Text>

      <TextInput 
        style={styles.input} 
        placeholder="New skill"
        placeholderTextColor="#555" 
        onChangeText={setNewSkill}
      />
      
      <Button title="Add" onPress={handleAddNewSkill}/>

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My skills
      </Text>

      <FlatList 
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard 
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        color: '#fff',
        fontSize: 18,
        marginTop: 30,
        padding: Platform.OS === 'ios' ? 15 : 10,
        backgroundColor: '#1f1e25',
        borderRadius: 7
    }
})
