import { defineStore } from "pinia";
export const useMessagesStore = defineStore({
    id: "messages-store",
    state: () => {
        return {
            messages: [
                {
                    id: 1,
                    title: "Message 1",
                    content: "This is the content of message 1.",
                    isRead: false,
                    isArchived: false,
                },
                {
                    id: 2,
                    title: "Message 2",
                    content: "This is the content of message 2.",
                    isRead: true,
                    isArchived: false,
                },
                {
                    id: 3,
                    title: "Message 3",
                    content: "This is the content of message 3.",
                    isRead: true,
                    isArchived: false,
                },
                {
                    id: 4,
                    title: "Message 4",
                    content: "This is the content of message 4.",
                    isRead: false,
                    isArchived: true,
                },
                {
                    id: 5,
                    title: "Message 5",
                    content: "This is the content of message 5.",
                    isRead: false,
                    isArchived: false,
                },
                {
                    id: 6,
                    title: "Message 6",
                    content: "This is the content of message 6.",
                    isRead: true,
                    isArchived: true,
                },
                {
                    id: 7,
                    title: "Message 7",
                    content: "This is the content of message 7.",
                    isRead: false,
                    isArchived: false,
                },
                {
                    id: 8,
                    title: "Message 8",
                    content: "This is the content of message 8.",
                    isRead: true,
                    isArchived: true,
                },
                {
                    id: 9,
                    title: "Message 9",
                    content: "This is the content of message 9.",
                    isRead: false,
                    isArchived: false,
                },
                {
                    id: 10,
                    title: "Message 10",
                    content: "This is the content of message 10.",
                    isRead: true,
                    isArchived: false,
                },
                {
                    id: 11,
                    title: "Message 11",
                    content: "This is the content of message 11.",
                    isRead: false,
                    isArchived: false,
                },
                {
                    id: 12,
                    title: "Message 12",
                    content: "This is the content of message 12.",
                    isRead: true,
                    isArchived: true,
                },
                {
                    id: 13,
                    title: "Message 13",
                    content: "This is the content of message 13.",
                    isRead: false,
                    isArchived: true,
                },
                {
                    id: 14,
                    title: "Message 14",
                    content: "This is the content of message 14.",
                    isRead: true,
                    isArchived: false,
                },
                {
                    id: 15,
                    title: "Message 15",
                    content: "This is the content of message 15.",
                    isRead: false,
                    isArchived: false,
                },
                ],
        }
    },
    actions: {
        markMessageAsRead(messageId) {
            const message = this.messages.find((msg) => msg.id === messageId);
            if (message) {
                message.isRead = true;
            }
        },
        markMessageAsUnread(messageId) {
            const message = this.messages.find((msg) => msg.id === messageId);
            if (message) {
                message.isRead = false;
            }
        },
        archiveMessage(messageId) {
            const message = this.messages.find((msg) => msg.id === messageId);
            if (message) {
                message.isArchived = true;
                
            }
        },
        unarchiveMessage(messageId) {
            const message = this.messages.find((msg) => msg.id === messageId);
            if (message) {
                message.isArchived = false;
                
            }
        },
    }
})