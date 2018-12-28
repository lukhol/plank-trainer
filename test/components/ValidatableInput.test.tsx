import React from 'react';
import ValidatableInput,  {ValidatableInputProps } from '../../src/components/ValidateableInput';
import renderer from 'react-test-renderer';

describe(' ------ ValidatableInput ------ ', () => {
    const getComponent = (props: ValidatableInputProps) => {
        return (
            renderer.create(
                <ValidatableInput
                    {...props}
                />
            )
        )
    };

    it('renders correctly with defaults and valid state', () => {
        const validatableInput = getComponent({
            value: 'Some value',
            onChangeText: (text: string) => {},
            isValid: true
        });

        expect(validatableInput.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with defaults and invalid state', () => {
        const validatableInput = getComponent({
            value: 'Some value',
            onChangeText: (text: string) => {},
            isValid: false
        });

        expect(validatableInput.toJSON()).toMatchSnapshot();
    });
});