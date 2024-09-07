import { AssertionError } from '@std/assert'

/**
 * Asserts some of assertions will succeed.
 */
export default function assertAny(assertions: (() => void)[]): void {
  let assertionError: AssertionError

  const passed = assertions.some(assertion => {
    try {
      assertion()

      return true
    } catch (error: unknown) {
      if (error instanceof AssertionError) {
        assertionError = error
      }

      return false
    }
  })

  if (!passed) {
    throw assertionError!
  }
}
