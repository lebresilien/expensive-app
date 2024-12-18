import { Tabs } from 'expo-router';
import React, { useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabDisplayContext } from '@/hooks/useTabDisplay';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [display, setDisplay] = useState<'flex' | 'none'>('flex');

  const value = {
    display,
    setDisplay,
  };

  return (
    <TabDisplayContext.Provider value={value}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].activeTint,
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].inactiveTint,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].tint,
            display: display
          },
          
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="(dashboard)"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: 'Statistisques',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(settings)"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(account)"
          options={{
            title: 'Categories',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'information-circle' : 'information-circle-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </TabDisplayContext.Provider>
  );
}
