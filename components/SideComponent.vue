<!-- components/SideComponent.vue -->
<template>
    <aside class="side-component">
        <!-- Logo -->
        <div class="side-component__logo">
            <!-- Add your logo here -->
            <img
                src="@/assets/images/Logo.svg"
                alt="Logo"
            />
        </div>

        <!-- Inbox Card -->
        <SideCardComponent
            icon="inbox.svg"
            text="Inbox"
            :messageCount="inboxCount"
            to="/inbox"
            :isActive="isActive('/inbox')"
        />

        <!-- Archive Card -->
        <SideCardComponent
            icon="archive.svg"
            text="Archive"
            :messageCount="archiveCount"
            to="/archive"
            :isActive="isActive('/archive')"
        />

        <!-- Logout button -->
        <button
            class="side-component__logout-button"
            @click="logout"
        >
            <!-- Add the logout icon (you can replace the 'logout-icon.svg' with your actual icon path) -->
            <img
                src="@/assets/images/log-out.svg"
                alt="Logout"
                class="side-component__logout-icon"
            />
            Logout
        </button>
    </aside>
</template>
<script setup>
/* if we need to use pinia to show count */
import { useMessagesStore } from '@/stores/messages';
const messagesStore = useMessagesStore()
const messages = messagesStore.messages
const inboxCount = computed(() => messages.filter((message) => { return !message.isArchived; }).length)
const archiveCount = computed(() => messages.filter((message) => { return message.isArchived; }).length)


// const inboxCount = useInbox()
// const archiveCount = useArchive()

const isActive = (route) => {
    // Check if the current route matches the given route
    const currentRoute = useRoute();
    return currentRoute.path === route;
}
</script>

<style lang="scss" scoped>
/* Add styles for the side component and other elements as needed */
.side-component {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid #e5e7eb;
    background-color: #f8fafc;
    padding: 20px 10px;

    &__logo {
        /* Add styles for the logo here */
        padding: 16px;
    }

    &__logout-button {
        /* Add styles for the logout button here */
        display: flex;
        align-items: center;
        padding: 12px 24px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 16px;
        margin-top: auto;
        font-weight: 500;
        color: #4b5563;
    }

    &__logout-icon {
        /* Add styles for the logout icon here */
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
}
</style>

