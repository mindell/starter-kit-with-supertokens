import { SuperTokensWrapper } from 'supertokens-auth-react'
import { frontendConfig } from '@/config/frontendConfig'
import SuperTokens from 'supertokens-web-js'

if (typeof window !== 'undefined') {
  SuperTokens.init(frontendConfig())
}

export default function SuperTokensProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <SuperTokensWrapper>{children}</SuperTokensWrapper>
}
