import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import UserLogged from './UserLogged';

export default function Account() {
  return (
    <ScrollView>
      <UserLogged />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
