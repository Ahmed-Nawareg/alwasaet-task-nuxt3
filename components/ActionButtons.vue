<template>
    <div class="message-list__actions__buttons">
        <button
            v-if="showMarkAsReadButton"
            @click="markAsRead"
            class="message-list__actions__buttons__button button--mark-as-read"
        >
            <img src="../assets/images/mark-read.svg" /> Mark as Read (r)
        </button>
        <button
            v-else-if="showMarkAsUnreadButton"
            @click="markAsUnread"
            class="message-list__actions__buttons__button button--mark-as-unread"
        >
            <img src="../assets/images/mark-read.svg" /> Mark as Unread (n)
        </button>
        <button
            v-if="formMessageSlider"
            @click="toggleArchive"
            class="message-list__actions__buttons__button"
        >
            <img :src="messageSliderArchiveButtonImage" />
            {{ messageSliderArchiveButtonText }}
        </button>
        <div v-else>
            <button
                v-if="currentRoute.path === '/inbox'"
                @click="addToArchive"
                class="message-list__actions__buttons__button button--add-to-archive"
            >
                <img src="../assets/images/set-in-archive.svg" /> Add to Archive (a)
            </button>
            <button
                v-if="currentRoute.path === '/archive'"
                @click="removeFromArchive"
                class="message-list__actions__buttons__button button--remove-from-archive"
            >
                <img src="../assets/images/set-in-archive.svg" /> Remove from Archive (a)
            </button>
        </div>
    </div>
</template>

<script setup>
const { messagesIds, formMessageSlider, message } = defineProps([
    'messagesIds', 'formMessageSlider', 'message'
]);
const emit = defineEmits()

import { useMessagesStore } from '@/stores/messages';
const messagesStore = useMessagesStore()
const messagesFromStore = messagesStore.messages
const messages = messagesFromStore.filter((obj) => messagesIds.includes(obj.id));
const currentRoute = useRoute();



const showMarkAsReadButton = computed(() => {
    return messagesIds.some(
        (messageId) => messages.find((message) => message.id === messageId).isRead === false
    );
});


const showMarkAsUnreadButton = computed(() => {
    return messagesIds.some(
        (messageId) => messages.find((message) => message.id === messageId).isRead === true
    );
});

const markAsRead = () => {
    messagesIds.forEach(id => messagesStore.markMessageAsRead(id));
};

const markAsUnread = () => {
    messagesIds.forEach(id => messagesStore.markMessageAsUnread(id));
};




const messageSliderArchiveButtonImage = computed(() => {
    return messages[0].isArchived ? '../assets/images/set-in-archive.svg' : '../assets/images/set-in-archive.svg';
});

const messageSliderArchiveButtonText = computed(() => {
    return messages[0].isArchived ? 'Remove from Archive (a)' : 'Add to Archive (a)';
});


watch(
    () => formMessageSlider,
    (newVal) => {
        if (newVal) {
            messageSliderArchiveButtonImage.value = messages[0].isArchived ? '../assets/images/set-in-archive.svg' : '../assets/images/set-in-archive.svg';
            messageSliderArchiveButtonText.value = messages[0].isArchived ? 'Remove from Archive (a)' : 'Add to Archive (a)';
        }
    }
);

const addToArchive = () => {
    messagesIds.forEach(id => messagesStore.archiveMessage(id));
    emit('removeSelection')
};

const removeFromArchive = () => {
    messagesIds.forEach(id => messagesStore.unarchiveMessage(id));
    emit('removeSelection')
};
const toggleArchive = () => {
    const isArchived = messages[0].isArchived;
    if (isArchived) {
        removeFromArchive()
    } else {
        addToArchive()
    }
};
</script>

<style lang="scss" scoped>
/* Your CSS styles for message action buttons go here */
.message-list {
    &__actions {
        display: flex;
        padding: 24px;
        justify-content: space-between;
        align-items: center;
        &__buttons {
            display: flex;
            gap: 8px;
            align-items: center;
            &__button {
                display: flex;
                gap: 4px;
                background: unset;
                border: unset;
                font-size: 14px;
                font-weight: 500;
                color: #4b5563;
            }
        }
    }
}
</style>
