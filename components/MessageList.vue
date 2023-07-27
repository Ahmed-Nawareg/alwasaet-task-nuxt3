<template>
    <div
        class="message-list"
        @keydown="handleKeydown"
    >
        <div class="message-list__header">
            <h2 class="message-list__title">
                {{ title }}
            </h2>
            <div class="message-list__actions">
                <div class="message-list__actions__select">
                    <label class="message-checkbox select-all">
                        <input
                            type="checkbox"
                            v-model="selectAll"
                            @change="toggleSelectAll"
                            class="message-checkbox__input"
                        >
                    </label>
                    <p class="select-all-counter">Email Selected ({{ selectedMessages.length }})</p>
                </div>
                <ActionButtons
                    v-if="selectedMessages.length"
                    :messagesIds="selectedMessages"
                    :key="selectedMessages"
                    @removeSelection="selectedMessages = []"
                />
            </div>
        </div>
        <MessageCard
            v-for="message in displayedMessages"
            :key="message.id"
            :isSelected="selectedMessages.includes(message.id)"
            @toggleSelect="toggleSelect(message.id)"
            :message="message"
            @openSlider="openSlider"
        />

        <MessageSlider
            :key="selectedMessageToOpen"
            :message="selectedMessageToOpen"
            :isOpen="selectedMessageToOpen"
            @closeSlider="closeSlider"
            @addToArchive="messagesStore.archiveMessage(selectedMessageToOpen.id)"
            @removeFromArchive="messagesStore.unarchiveMessage(selectedMessageToOpen.id)"
            @markAsRead="messagesStore.markMessageAsRead(selectedMessageToOpen.id)"
            @markAsUnread="messagesStore.markMessageAsUnread(selectedMessageToOpen.id)"
        />
    </div>
</template>

<script setup>
const { title } = defineProps([
    'title'
]);

import { useMessagesStore } from '@/stores/messages';
const messagesStore = useMessagesStore()
const messages = messagesStore.messages

const currentRoute = useRoute();
const displayedMessages = computed(() => {
    return messages.filter((message) => {
        if (currentRoute.path === '/inbox') {
            return !message.isArchived;
        } else if (currentRoute.path === '/archive') {
            return message.isArchived;
        }
    });
});


const selectedMessages = ref([]);

const selectAll = computed({
    get: () => selectedMessages.value.length === displayedMessages.value.length,
    set: (value) => {
        selectedMessages.value = value ? displayedMessages.value.map((message) => message.id) : [];
    },
});

const toggleSelect = (messageId) => {
    if (selectedMessages.value.includes(messageId)) {
        selectedMessages.value = selectedMessages.value.filter((id) => id !== messageId);
    } else {
        selectedMessages.value.push(messageId);
        if (selectedMessages.value.length === displayedMessages.value.length) {
            selectAll.value = true;
        }
    }
};

const addToArchive = () => {
    selectedMessages.value.map(id => messagesStore.archiveMessage(id))
    selectedMessages.value = []
}
const removeFromArchive = () => {
    selectedMessages.value.map(id => messagesStore.unarchiveMessage(id))
    selectedMessages.value = []
}

const markAsRead = () => {
    selectedMessages.value.map(id => messagesStore.markMessageAsRead(id))
}
const markAsUnread = () => {
    selectedMessages.value.map(id => messagesStore.markMessageAsUnread(id))
}


// Method to handle keyboard shortcuts for archive and read buttons
const handleKeydown = (event) => {
    if (event.key === 'a') {
        if (currentRoute.path === '/inbox') {
            addToArchive();
        } else if (currentRoute.path === '/archive') {
            removeFromArchive();
        }
    } else if (event.key === 'r') {
        markAsRead();
    } else if (event.key === 'n') {
        markAsUnread();
    }
};

const selectedMessageToOpen = ref(null);

const openSlider = (message) => {
    selectedMessageToOpen.value = message;
    messagesStore.markMessageAsRead(message.id)
    selectedMessages.value = []
};

const closeSlider = () => {
    selectedMessageToOpen.value = null;
};
</script>

<style lang="scss" scoped>
/* Styles for MessageList component */
.message-list {
    border-top: 1px solid #e5e7eb;
    height: 100%;
    // padding-top: 24px;
    background: white;
    &__header {
        padding-top: 24px;
        border: 1px solid #e5e7eb;
        border-top: 0;
        position: sticky;
        top: 0;
        background: white;
    }
    &__title {
        background: white;
        padding: 0 24px;
        font-size: 32px;
        font-weight: 500;
        color: #121829;
    }
    &__actions {
        display: flex;
        padding: 24px;
        justify-content: space-between;
        align-items: center;
        &__select {
            display: flex;
            align-items: center;
            gap: 12px;
            .message-checkbox {
                display: flex;
                align-items: center;
                &__input {
                    width: 20px;
                    height: 20px;
                }
            }
            .select-all-counter {
                font-size: 14px;
                font-weight: 500;
                color: #000000;
                /* Your styles for the "Select All" checkbox label */
            }
        }
        &__buttons {
            display: flex;
            // padding: 24px;
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
    .message {
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 20px 24px;
        font-size: 14px;
        font-weight: 500;
        color: #121829;
    }
    .message--read {
        // opacity: 0.5; /*based on task instruction */
        background-color: #f3f6fb; /*based on figma style */
    }

    .message-checkbox {
        display: flex;
        align-items: center;
        &__input {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
