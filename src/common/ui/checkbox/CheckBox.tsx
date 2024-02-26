import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import CheckIcon from '@/assets/icons/CheckIcon'
import * as Checkbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

type CheckBoxProps = { className?: string; label?: ReactNode | string } & ComponentPropsWithoutRef<
  typeof Checkbox.Root
>

const CheckBox = forwardRef<HTMLDivElement, CheckBoxProps>(({ className, ...props }, ref) => {
  const classNames = {
    checkBoxWrapper: clsx(s.checkBoxWrapper, className),
  }

  return (
    <div className={classNames.checkBoxWrapper} ref={ref}>
      <Checkbox.Root className={s.checkboxRoot} {...props}>
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {props.label && (
        <label className={s.checkboxLabel} htmlFor={props.id}>
          {props.label}
        </label>
      )}
    </div>
  )
})

export default CheckBox
