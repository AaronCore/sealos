import { PersistentVolumeClaim, Pod } from '@/k8slens/kube-object';
import Drawer from '../../../drawer/drawer';
import { KubeObjectInfoList } from '@/components/kube/object/detail/kube-object-detail-info-list';
import { DrawerItem } from '@/pages/kubepanel/components/drawer/drawer-item';
import { KubeBadge } from '@/components/kube/kube-badge';
import React from 'react';
import DrawerPanel from '../../../drawer/drawer-panel';

interface Props {
  volumeClaim?: PersistentVolumeClaim;
  pods: Pod[];
  open: boolean;
  onClose: () => void;
}
const PersistentVolumeClaimDetail = ({ volumeClaim, pods, open, onClose }: Props) => {
  if (!volumeClaim) return null;

  if (!(volumeClaim instanceof PersistentVolumeClaim)) {
    // logger.error("[PersistentVolumeClaimDetail]: passed object that is not an instanceof PersistentVolumeClaim", volumeClaim);

    return null;
  }

  const { storageClassName, accessModes } = volumeClaim.spec;

  // const storageClassDetailsUrl = getDetailsUrl(storageClassApi.formatUrlForNotListing({
  //   name: storageClassName,
  // }));

  return (
    <Drawer open={open} title={`PersistentVolumeClaim: ${volumeClaim.getName()}`} onClose={onClose}>
      <DrawerPanel>
        <KubeObjectInfoList obj={volumeClaim} />
        <DrawerItem name={'Access Modes'} value={accessModes?.join(', ')} />
        <DrawerItem name="Storage Class Names" value={storageClassName} />
        <DrawerItem name="Storage" value={volumeClaim.getStorage()} />
        <DrawerItem
          name="Pods"
          value={volumeClaim.getPods(pods).map((pod) => (
            <span key={pod.getName()} className="mr-1">
              {pod.getName()}
            </span>
          ))}
        />
        <DrawerItem name="Status" value={volumeClaim.getStatus()} />
      </DrawerPanel>

      <DrawerPanel title="Selector">
        <DrawerItem
          name="Match Labels"
          value={volumeClaim.getMatchLabels().map((label) => (
            <KubeBadge key={label} label={label} />
          ))}
        />
        <DrawerItem
          name="Match Expressions"
          value={volumeClaim.getMatchExpressions().map(({ key, operator, values }, i) => (
            <React.Fragment key={i}>
              <DrawerItem name="Key" value={key} />
              <DrawerItem name="Operator" value={operator} />
              <DrawerItem name="Values" value={values?.join(', ')} />
            </React.Fragment>
          ))}
        />
      </DrawerPanel>
    </Drawer>
  );
};

export default PersistentVolumeClaimDetail;