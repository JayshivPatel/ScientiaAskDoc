import { CloudDrizzleFill, TreeFill, SunFill, Snow, EggFill, Rainbow } from 'react-bootstrap-icons'
import { Group, Item } from '../../styles/timeline/switcher.style'
import { Wrapper } from '../../styles/_app.style'

/**
 * The timeline switcher houses a toggle group of six term and break toggles.
 * The switcher has two rows: the first houses the term toggles while the second houses the break toggles. Currently, we
 * hardcode the width of the switcher group to wrap the rows.
 *
 * NOTE: As always, there's some teminology. Terms and breaks are phases in an academic year. The individual terms or
 * breaks (e.g. autumn term or winter break) are specific periods in an academic year.
 */
const phases = {
  Term: {
    Autumn: <CloudDrizzleFill size={22} />,
    Spring: <TreeFill size={22} />,
    Summer: <SunFill size={22} />,
  },
  Break: {
    Winter: <Snow size={22} />,
    Easter: <EggFill size={22} />,
    Summer: <Rainbow size={22} />,
  },
}

export const Switcher = ({ term, onSwitch }: { term: string; onSwitch: (term: string) => void }) => {
  const switcherGroupStyle = { maxWidth: '9.75rem', gap: '0.5rem', flexWrap: 'wrap' }

  return (
    <Wrapper center css={{ gridArea: 'switcher' }}>
      <Group type="single" defaultValue={term} onValueChange={onSwitch} css={switcherGroupStyle}>
        {Object.entries(phases).map(([phase, periods]) =>
          Object.entries(periods).map(([period, icon]) => (
            <Item value={period + ' ' + phase} key={period}>
              {icon}
            </Item>
          ))
        )}
      </Group>
    </Wrapper>
  )
}
