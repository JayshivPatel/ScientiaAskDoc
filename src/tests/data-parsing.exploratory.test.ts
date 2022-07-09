import { plainToClass } from 'class-transformer'
import { Exercise } from '../constants/types'

test('can parse Date correctly from string', () => {
  const rawExercise = {
    number: 4,
    title: 'Pintos Task 1 - Scheduling',
    type: 'CW',
    start_date: '2021-10-11T12:00:00Z',
    end_date: '2021-10-29T19:00:00Z',
    submission_type: 'group',
  }
  const expectedExercise = {
    number: 4,
    title: 'Pintos Task 1 - Scheduling',
    type: 'CW',
    start_date: new Date(Date.UTC(2021, 9, 11, 12)),
    end_date: new Date(Date.UTC(2021, 9, 29, 19)),
    submission_type: 'group',
  }

  let actual = plainToClass(Exercise, rawExercise)
  expect(actual).toEqual(expectedExercise)
})