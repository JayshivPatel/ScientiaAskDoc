import { Accordion, Box, Content, Header, Item, Trigger } from '../styles/grouped-list.style'
import { ReactNode } from 'react'
import { Checkbox, Indicator } from '../styles/login.style'
import { Check, Dash } from 'react-bootstrap-icons'

/**
 * TODO: We need to accept, as parameters, the group data, a generator function for the content box, along with misc.
 *       parameters (i.e. relevant attribute names and other preferences)
 */

export const GroupedList = ({
  data,
  selectionMode = false,
  selectionTable = {},
  onHeaderSelection = (header, checked) => {},
  onContentSelection = (header, groupItem, checked) => {},
  contentGenerator,
  headerGenerator,
}: {
  data: { [key: string]: object[] }
  selectionMode?: boolean
  selectionTable?: { [key: string]: { [key: string]: boolean } }
  // TODO: checked should be CheckedState, possibly using some coercion later on
  onHeaderSelection?: (header: string, checked: any) => void
  onContentSelection?: (header: string, groupItem: any, checked: any) => void
  contentGenerator: (header: string, group: object[]) => ReactNode
  headerGenerator: (header: string, group: object[]) => ReactNode
}) => {
  return (
    <Accordion type="multiple" defaultValue={Object.keys(data)}>
      {
        /**
         * NOTE: We're iterating over the groups while creating
         * an accordion toggle for each group with a tab list of
         * resources contained in that group.
         */
        data &&
          Object.entries(data).map(([header, group]) => {
            let selections = selectionMode ? Object.values(selectionTable[header]) : []
            let someButNotAllSelected = selections.some(Boolean) && !selections.every(Boolean)
            return (
              <Item value={header} key={header}>
                {/* TODO: Allow user to specify unique identifier attribute instead */}
                <Header>
                  <Trigger>{headerGenerator(header, group)}</Trigger>
                  {selectionMode && (
                    <Checkbox
                      css={{ minWidth: '1.75rem' }}
                      checked={someButNotAllSelected ? 'indeterminate' : selections.every(Boolean)}
                      onCheckedChange={(checked) => onHeaderSelection(header, checked)}
                    >
                      <Indicator>{someButNotAllSelected ? <Dash /> : <Check />}</Indicator>
                    </Checkbox>
                  )}
                </Header>
                {/* TODO: Allow user to specify a way to calculate the max height */}
                <Content css={{ maxHeight: `calc(${group?.length} * 2.75rem + 1rem)` }}>
                  {/* TODO: Allow user to pass in styling overrides for this box */}
                  <Box>{contentGenerator(header, group)}</Box>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      minWidth: '1.75rem',
                      minHeight: '100%',
                    }}
                  >
                    {selectionMode &&
                      group.map((groupItem: any) => {
                        return (
                          <Checkbox
                            checked={selectionTable[header][groupItem.title]}
                            onCheckedChange={(checked) => onContentSelection(header, groupItem, checked)}
                            key={groupItem.title} // TODO: use id
                          >
                            <Indicator>
                              <Check />
                            </Indicator>
                          </Checkbox>
                        )
                      })}
                  </div>
                </Content>
              </Item>
            )
          })
      }
    </Accordion>
  )
}
