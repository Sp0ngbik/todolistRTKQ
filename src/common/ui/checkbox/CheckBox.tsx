import { ComponentPropsWithoutRef } from 'react'

import CheckIcon from '@/assets/icons/CheckIcon'
import * as Checkbox from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'
type CheckBoxProps = {} & ComponentPropsWithoutRef<typeof Checkbox.Root>

const CheckBox = (props: CheckBoxProps) => {
  return (
    <form>
      <div className={s.checkBoxWrapper}>
        <Checkbox.Root className={s.checkboxRoot} {...props}>
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
    </form>
  )
}

export default CheckBox
