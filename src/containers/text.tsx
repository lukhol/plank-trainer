import React, { ReactElement } from 'react';
import { View, Text, SectionList, SectionListData } from 'react-native';

export default class TestComponent extends React.Component {
    constructor(props: any){
        super(props);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
    }

    // renderSectionHeader(sectionListData: SectionListData<string[]>): any {
    //     <Text>{sectionListData.section.title}</Text>
    // }

    renderSectionHeader = ({ section }: {section: SectionListData<string[]>}): ReactElement<any> | null => (<Text>{section.title}</Text>)

    render() {
        return (
            <SectionList
                sections={[
                    {title: 'Title1', data: ['item1', 'item2']},
                    {title: 'Title2', data: ['item3', 'item4']},
                    {title: 'Title3', data: ['item5', 'item6']},
                  ]}
                  renderSectionHeader={this.renderSectionHeader}
            />
        )
    }
}