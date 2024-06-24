import { Button } from 'antd'

const Welcome: React.FC = () => {
  return (
    <div>
      {/* Welcome */}
      <Button
        onClick={() => {
          console.log('aaa')
        }}
      >
        add8
      </Button>
    </div>
  )
}

export default Welcome
