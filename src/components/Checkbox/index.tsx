import styles from './styles.module.scss'

// import { Checkbox as MCheckbox, CheckboxProps } from '@mui/material'

import { Checkbox as CHCheckbox, ComponentWithAs, CheckboxProps } from "@chakra-ui/react"

import { IInputs } from '../Forms/CreateDefaultAnalysis'

interface IProps extends CheckboxProps {
  text: string,
}

const Checkbox: React.FC<IProps> = ({ text,...rest }) => {
  return (
    <label className={styles.checkboxWrapper}>
      {/* <MCheckbox 
        {... rest}
        sx={{
          color: '#BDBDBD ',
          '&.Mui-checked': {
            color: '#8981D8'
          }
        }}
      /> */}
      <CHCheckbox size='lg' backgroundColor={'#FFF'} borderColor={'#BDBDBD'} colorScheme={'#fff'} iconColor='#8981D8' { ...rest }/>
      <span>{text}</span>
    </label>
  )
}

export { Checkbox }