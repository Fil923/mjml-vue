<template>
	<Skeleton title="Welcome" preview="Welcome to our platform!">
		<mj-section background-color="#ffffff" padding="20px">
			<mj-column>
				<mj-text v-pre font-size="24px" color="#333333" align="center">
					Welcome, {{ userName }}!
				</mj-text>
				<mj-text font-size="16px" color="#555555" padding="10px 25px">
					We're glad to have you on board. Click the button below to get started with your account.
				</mj-text>
				<mj-button
					v-pre
					href="{{activationUrl}}"
					background-color="#346DB7"
					color="white"
					font-size="16px"
					padding="20px"
					border-radius="4px"
				>
					Activate Your Account
				</mj-button>
			</mj-column>
		</mj-section>
		<template #footer>
			<mj-text font-size="12px" color="#999999" align="center">
				If you didn't sign up, please ignore this email.
			</mj-text>
		</template>
	</Skeleton>
</template>

<script setup lang="ts">
// oxlint-disable-next-line unused-imports/no-unused-imports
import { Skeleton } from "@/components/mjml";
</script>
