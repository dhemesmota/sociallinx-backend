import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidAttachmentTypeError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`O tipo de arquivo "${type}" não é válido.`)
  }
}
