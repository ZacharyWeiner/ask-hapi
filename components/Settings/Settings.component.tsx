import { useState } from 'react';
import { Container, Text, NumberInput, Slider } from '@mantine/core';
// import { useEffect, useState } from 'react';
import ModelSelection from './ModelSelection/ModelSelection.component';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

const data = [
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
      label: 'Platinum',
      value: 'text-davinci-003',
      description: 'Use the fastest and best trained AI ',
    },

    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
      label: 'Gold',
      value: 'text-curie-001',
      description: 'Very capable, but a better value if you can spare a second or 2',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
      label: 'Silver',
      value: 'text-davinci-002',
      description: 'Straight forward tasks like classifcation or translation',
    },
  ];

export default function Settings(props:any) {
    const [fp, setFP] = useState(props.frequencyPenalty * 100);
    const [pp, setPP] = useState(props.presencePenalty * 100);
    const updateFP = (val:any) => {
        setFP(val);
        props.onFrequencyPenaltyChange(val / 100);
    };
    const updatePP = (val:any) => {
        setPP(val);
        props.onPresencePenaltyChange(val / 100);
    };
    return (
        <div>
            <Container>
                <ColorSchemeToggle />
                <div> Model: { props.model }</div>
                <ModelSelection
                  data={data}
                  model={props.model}
                  handleModelChanged={props.onModelChanged}
                />
                <NumberInput
                  defaultValue={props.temperature}
                  placeholder="Your age"
                  label="Randomness to Apply (0 is repetitive 1 is unique)"
                  precision={2}
                  step={0.05}
                  min={0}
                  max={1}
                  withAsterisk
                />
                <Container style={{ margin: '12px' }}>
                    <Text> Frequency Penalty - low for SEO high for unique content</Text>
                    <Slider
                      value={fp}
                      onChange={updateFP}
                      marks={[
                        { value: 0.0, label: '0.0' },
                        { value: 20, label: '0.20' },
                        { value: 40, label: '0.40' },
                        { value: 60, label: '0.60' },
                        { value: 80, label: '0.80' },
                        { value: 1, label: '1' },
                    ]}
                    />
                </Container>
                <Container style={{ margin: '12px', marginTop: '48px' }}>
                    <Text> Presence Penalty - low to stay on topic,
                        high to increase chances of multiple topics.
                    </Text>
                    <Slider
                      value={pp}
                      onChange={updatePP}
                      marks={[
                        { value: 0.0, label: '0.0' },
                        { value: 20, label: '0.20' },
                        { value: 40, label: '0.40' },
                        { value: 60, label: '0.60' },
                        { value: 80, label: '0.80' },
                        { value: 1, label: '1' },
                    ]}
                    />
                </Container>
            </Container>

        </div>
    );
}
