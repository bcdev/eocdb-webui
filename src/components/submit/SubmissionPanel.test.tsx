import * as React from 'react';
import SubmitPanel from "./SubmissionPanel";
import { createShallow } from '@material-ui/core/test-utils';


interface MockProps {
    show: boolean;
    submissionOpen: boolean;
    openSubmission: () => void;
    closeSubmission: () => void;
}


const props: MockProps = {
    show: true,
    submissionOpen: false,
    openSubmission: jest.fn(),
    closeSubmission: jest.fn(),
};


describe('<SubmissionPanel />', () => {
    let mount: any;

    beforeEach(() => {
        mount = createShallow();
    });


    it('SubmissionPanel renders children', () => {
        const enzymeWrapper = mount(<SubmitPanel {...props} />);
        expect(enzymeWrapper.find('SubmitPanel').length).toBe(1);
    });
});