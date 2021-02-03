<template>
  <div>
    <div class="mt-6 mb-1 uppercase text-textMedium text-13 font-bold">
      Reporter
    </div>
    <j-select
      searchable
      variant="empty"
      :withClearValue="false"
      :dropdownWidth="300"
      :value="reporterId"
      :options="userOptions"
      customRender
      customRenderOption
      @change="updateIssueReporter"
    >
      <template v-slot:default="{ user }">
        <j-button variant="secondary">
          <div class="flex items-center">
            <j-avatar
              :size="20"
              :avatarUrl="user.data.avatar.url"
              :name="user.data.first_name"
            />
            <div class="ml-1-5 mr-1">
              {{ user.data.first_name }}
            </div>
          </div>
        </j-button>
      </template>
      <template v-slot:option="{ user }">
        <div class="my-px mr-4 flex items-center">
          <j-avatar :size="20" :avatarUrl="user.data.avatar.url" :name="user.data.first_name" />
          <div class="ml-1-5 mr-1">
            {{ user.data.first_name }}
          </div>
        </div>
      </template>
    </j-select>
    <!-- ASSIGNEES -->
    <div class="mt-6 mb-1 uppercase text-textMedium text-13 font-bold">
      Assignees
    </div>
    <j-select
      searchable
      variant="empty"
      isMulti
      :withClearValue="false"
      :dropdownWidth="300"
      :value="userIDs"
      :options="userOptions"
      customRender
      customRenderOption
      @change="updateIssueAssignees"
    >
      <template v-slot:default="{ user, remove, optionValue }">
        <j-button variant="secondary">
          <div class="flex items-center">
            <j-avatar
              :size="20"
              :avatarUrl="user.data.avatar.url"
              :name="user.data.first_name"
            />
            <div class="ml-1-5 mr-1.5">
              {{ user.data.first_name }}
            </div>
            <j-icon
              v-if="remove"
              @click="remove(optionValue)"
              class="text-textLight"
              :size="20"
              name="times"
            ></j-icon>
          </div>
        </j-button>
      </template>
      <template v-slot:option="{ user }">
        <div class="my-px mr-4 flex items-center">
          <j-avatar :size="20" :avatarUrl="user.data.avatar.url" :name="user.data.first_name" />
          <div class="ml-1-5 mr-1">
            {{ user.data.first_name }}
          </div>
        </div>
      </template>
    </j-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { getters } from '../../../../store'
import Omit from 'lodash.omit'
import { User } from "@/types";
export default defineComponent({
  props: {
    reporterId: {
      type: String,
      required: true
    },
    users: {
      type: Array as () => Array<User>,
      required: true
    },
    updateIssue: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const project = computed(getters.project)
    const userOptions = project.value.users.map(user => ({
      label: user.data.first_name,
      value: user.id,
      user
    }))
    const getUserById = (userId: string) =>
      Omit(
        project.value.users.find(user => user.id === userId),
        ['__typename']
      )
    const updateIssueReporter = async (userId: string) => {
      try {
        await props.updateIssue({ reporterId: userId })
      } catch (error) {
        console.error(error)
      }
    }
    const updateIssueAssignees = async (userIds: [string]) => {
      try {
        await props.updateIssue({ userIds, users: userIds.map(getUserById) })
      } catch (error) {
        console.error(error)
      }
    }

    const userIDs = computed(() =>props.users.map(user => user.id))

    return {
      userOptions,
      userIDs,
      updateIssueReporter,
      updateIssueAssignees
    }
  }
})
</script>

<style></style>
