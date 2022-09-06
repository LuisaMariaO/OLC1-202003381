/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GUI;

/**
 *
 * @author Luisa María Ortiz
 */
public class Principal extends javax.swing.JFrame {

    /**
     * Creates new form Principal
     */
    public Principal() {
        initComponents();
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jMenuItem1 = new javax.swing.JMenuItem();
        jMenuItem2 = new javax.swing.JMenuItem();
        jMenuItem3 = new javax.swing.JMenuItem();
        jPanel1 = new javax.swing.JPanel();
        jMenuBar = new javax.swing.JMenuBar();
        jMenu_File = new javax.swing.JMenu();
        jMenuItem_openFile = new javax.swing.JMenuItem();
        jMenuItem_saveAs = new javax.swing.JMenuItem();
        jMenu_Report = new javax.swing.JMenu();
        jMenuItem_flowChart = new javax.swing.JMenuItem();
        jMenuItem_errors = new javax.swing.JMenuItem();
        jMenu_View = new javax.swing.JMenu();
        jMenuItem_userManual = new javax.swing.JMenuItem();
        jMenuItem_technicalManual = new javax.swing.JMenuItem();

        jMenuItem1.setText("jMenuItem1");

        jMenuItem2.setText("jMenuItem2");

        jMenuItem3.setText("jMenuItem3");

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Project 1 OLC1 ");
        setLocation(new java.awt.Point(0, 0));
        setResizable(false);

        jPanel1.setBackground(new java.awt.Color(255, 255, 255));

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 1338, Short.MAX_VALUE)
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 645, Short.MAX_VALUE)
        );

        jMenu_File.setText("File");
        jMenu_File.setFont(new java.awt.Font("Berlin Sans FB", 0, 15)); // NOI18N

        jMenuItem_openFile.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_N, java.awt.event.InputEvent.CTRL_MASK));
        jMenuItem_openFile.setFont(new java.awt.Font("Berlin Sans FB", 0, 14)); // NOI18N
        jMenuItem_openFile.setText("Open File");
        jMenuItem_openFile.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem_openFileActionPerformed(evt);
            }
        });
        jMenu_File.add(jMenuItem_openFile);

        jMenuItem_saveAs.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_G, java.awt.event.InputEvent.CTRL_MASK));
        jMenuItem_saveAs.setFont(new java.awt.Font("Berlin Sans FB", 0, 14)); // NOI18N
        jMenuItem_saveAs.setText("Save As...");
        jMenu_File.add(jMenuItem_saveAs);

        jMenuBar.add(jMenu_File);

        jMenu_Report.setText("Report");
        jMenu_Report.setFont(new java.awt.Font("Berlin Sans FB", 0, 15)); // NOI18N

        jMenuItem_flowChart.setFont(new java.awt.Font("Berlin Sans FB", 0, 14)); // NOI18N
        jMenuItem_flowChart.setText("FlowChart");
        jMenu_Report.add(jMenuItem_flowChart);

        jMenuItem_errors.setFont(new java.awt.Font("Berlin Sans FB", 0, 14)); // NOI18N
        jMenuItem_errors.setText("Errors");
        jMenu_Report.add(jMenuItem_errors);

        jMenuBar.add(jMenu_Report);

        jMenu_View.setText("View");
        jMenu_View.setFont(new java.awt.Font("Berlin Sans FB", 0, 15)); // NOI18N

        jMenuItem_userManual.setFont(new java.awt.Font("Berlin Sans FB", 0, 14)); // NOI18N
        jMenuItem_userManual.setText("User manual");
        jMenu_View.add(jMenuItem_userManual);

        jMenuItem_technicalManual.setFont(new java.awt.Font("Berlin Sans FB", 0, 14)); // NOI18N
        jMenuItem_technicalManual.setText("Technical manual");
        jMenu_View.add(jMenuItem_technicalManual);

        jMenuBar.add(jMenu_View);

        setJMenuBar(jMenuBar);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jMenuItem_openFileActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem_openFileActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jMenuItem_openFileActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Principal.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Principal.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Principal.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Principal.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Principal().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JMenuBar jMenuBar;
    private javax.swing.JMenuItem jMenuItem1;
    private javax.swing.JMenuItem jMenuItem2;
    private javax.swing.JMenuItem jMenuItem3;
    private javax.swing.JMenuItem jMenuItem_errors;
    private javax.swing.JMenuItem jMenuItem_flowChart;
    private javax.swing.JMenuItem jMenuItem_openFile;
    private javax.swing.JMenuItem jMenuItem_saveAs;
    private javax.swing.JMenuItem jMenuItem_technicalManual;
    private javax.swing.JMenuItem jMenuItem_userManual;
    private javax.swing.JMenu jMenu_File;
    private javax.swing.JMenu jMenu_Report;
    private javax.swing.JMenu jMenu_View;
    private javax.swing.JPanel jPanel1;
    // End of variables declaration//GEN-END:variables
}