import * as Notifications from 'expo-notifications';
import { getHistory } from '../store/db';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { useEffect } from 'react';

async function registerNotificationCategories() {
    await Notifications.setNotificationCategoryAsync('weather_reminder', [
        {
            identifier: 'SHOW_WEATHER',
            buttonTitle: 'Show',
            options: { opensAppToForeground: true },
        }
    ]);
}

export async function scheduleDailyNotification() {
    const history = await getHistory();
    const latestCity = history[0]?.city;

    const contentText = latestCity
        ? `Don't forget to check the weather in ${latestCity} today 🌤️`
        : "Don't forget to check the weather!! ☀️";

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Daily Reminder ☁️",
            body: contentText,
            sound: "default",
            categoryIdentifier: 'weather_reminder',
        },
        trigger: {
            type: SchedulableTriggerInputTypes.DAILY,
            hour: 9,
            minute: 0,
        },
    });
}

export function useNotifications() {
    useEffect(() => {
        async function setupNotifications() {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
            await registerNotificationCategories();
            await scheduleDailyNotification();
        }

        setupNotifications();
    }, []);
}
